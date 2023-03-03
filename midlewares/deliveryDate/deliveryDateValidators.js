// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// internal imports
const DeliveryDate = require("../../models/admin/DeliveryDate");

// add user
const addDeliveryDateValidators = [
    check("name")
        .isLength({ min: 1 , max: 10 })
        .withMessage("Name is required")
        .isAlpha("en-US")
        .withMessage("Name must not contain anything other than english alphabet")
        .trim()
        .custom(async (value) => {
            try {
            const deliveryDate = await DeliveryDate.findOne({ name: value });
            if (deliveryDate) {
                throw createError("Delivery Date already in use!");
            }
            } catch (err) {
            throw createError(err.message);
            }

            if(!(['Normal', 'Preorder'].includes(value))) {
              throw createError("Name must be Normal of Preorder!");
            }
        }),

    check("day")
      .isLength({ min: 1, max: 4 })
      .withMessage("Description must be under 4 digit")
      .trim()   
];

const addDeliveryDateValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else { 
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
    addDeliveryDateValidators,
    addDeliveryDateValidationHandler,
};