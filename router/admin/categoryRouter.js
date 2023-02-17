//external imports
const express = require('express');
const router = express.Router();

//internal imports
const {getCategories, createCategory, getCategory} = require('../../controller/admin/categoryController');
const avatarUpload = require("../../midlewares/category/avatarUpload");
const {
    addCategoryValidators,
    addCategoryValidationHandler,
  } = require("../../midlewares/category/categoryValidators");

router.get('/', getCategories);
router.post('/', avatarUpload, addCategoryValidators, addCategoryValidationHandler, createCategory);
router.get('/:id', getCategory);

module.exports = router;