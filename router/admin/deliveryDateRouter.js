//external imports
const express = require('express');
const router = express.Router();

//internal imports
const {getDeliveryDates, createDeliveryDate, getDeliveryDate, updateDeliveryDate, deleteDeliveryDate} = require('../../controller/admin/deliveryDateController');
const {
    addDeliveryDateValidators,
    addDeliveryDateValidationHandler,
  } = require("../../midlewares/deliveryDate/deliveryDateValidators");

router.get('/', getDeliveryDates);
router.post('/', addDeliveryDateValidators, addDeliveryDateValidationHandler, createDeliveryDate);
router.get('/:id', getDeliveryDate);
router.patch('/:id', updateDeliveryDate);
router.delete('/:id', deleteDeliveryDate);


module.exports = router;