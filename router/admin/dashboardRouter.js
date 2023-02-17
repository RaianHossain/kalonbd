//external imports
const express = require('express');
const router = express.Router();

//internal imports
const {dashboardHome} = require('../../controller/admin/dashboardController');

router.get('/', dashboardHome);

module.exports = router;