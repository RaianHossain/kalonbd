//external imports
const express = require('express');
const router = express.Router();

//internal imports
const {getCategories, createCategory, getCategory, updateCategory, deleteCategory} = require('../../controller/admin/categoryController');
const avatarUpload = require("../../midlewares/category/avatarUpload");
const {
    addCategoryValidators,
    addCategoryValidationHandler,
  } = require("../../midlewares/category/categoryValidators");

router.get('/', getCategories);
router.post('/', avatarUpload, addCategoryValidators, addCategoryValidationHandler, createCategory);
router.get('/:id', getCategory);
router.patch('/:id', avatarUpload, updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;