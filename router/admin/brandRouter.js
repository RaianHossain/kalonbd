//external imports
const express = require('express');
const router = express.Router();

//internal imports
const {getBrands, createBrand, getBrand, updateBrand, deleteBrand} = require('../../controller/admin/brandController');
const logoUpload = require("../../midlewares/brand/logoUpload");
const {
    addBrandValidators,
    addBrandValidationHandler,
  } = require("../../midlewares/brand/brandValidators");

router.get('/', getBrands);
router.post('/', logoUpload, addBrandValidators, addBrandValidationHandler, createBrand);
router.get('/:id', getBrand);
router.patch('/:id', logoUpload, updateBrand);
router.delete('/:id', deleteBrand);


module.exports = router;