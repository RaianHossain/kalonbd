//external imports
const express = require('express');
const router = express.Router();

//internal imports
const {getUsers} = require('../../controller/admin/userController');

router.get('/', getUsers);

module.exports = router;