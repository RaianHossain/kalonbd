// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// internal imports
const Brand = require("../../models/admin/Brand");

// add user
const addBrandValidators = [
    check("name")
        .isLength({ min: 1 , max: 10 })
        .withMessage("Name is required")
        .isAlpha("en-US")
        .withMessage("Name must not contain anything other than english alphabet")
        .trim()
        .custom(async (value) => {
            try {
            const brand = await Brand.findOne({ name: value });
            if (brand) {
                throw createError("Brand already in use!");
            }
            } catch (err) {
            throw createError(err.message);
            }
        }),

    check("description")
      .isLength({ max: 300 })
      .withMessage("Description must be under 300 words")
      .trim()   
];

const addBrandValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../../public/uploads/brandLogo/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
    addBrandValidators,
    addBrandValidationHandler,
};