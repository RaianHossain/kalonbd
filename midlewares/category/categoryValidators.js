// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// internal imports
const Category = require("../../models/Category");

// add user
const addCategoryValidators = [
    check("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .trim()
        .custom(async (value) => {
            try {
            const category = await Category.findOne({ name: value });
            if (category) {
                throw createError("Category already in use!");
            }
            } catch (err) {
            throw createError(err.message);
            }
        }),

    check("description")
      .isLength({ max: 300 })
      .withMessage("Description must be under 300 words")
      .trim(),

    check("parent_id")
        .custom(async (value) => {
          // console.log(value);
          if(value){
            try {
            const category = await Category.findOne({_id: value});
            if (!category) {
                throw createError("Not a valid parent id");
            }
            } catch (err) {
            throw createError(err.message);
            }
          }
        }),  
];

const addCategoryValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../../public/uploads/categoryAvatar/${filename}`),
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
    addCategoryValidators,
    addCategoryValidationHandler,
};