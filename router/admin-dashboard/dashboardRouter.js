//external imports
const express = require('express');
const router = express.Router();

//internal imports
const {dashboardHome} = require('../../controller/dashboardController');

router.get('/', dashboardHome);

module.exports = router;