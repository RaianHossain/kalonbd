const express = require('express');
const router = express.Router();

//internal imports
const {getLogin} = require('../../controller/admin/loginController');

router.get('/', getLogin);

module.exports = router;