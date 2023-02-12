const express = require('express');
const router = express.Router();

//internal imports
const {getLogin} = require('../controller/loginController');

router.get('/', getLogin);

module.exports = router;