const express = require('express');
const router = express.Router();
const UserController = require('../../controller/user')

router.post('/create', UserController.registerUser);
router.post('/login', UserController.login);
router.post('/forgot-password', UserController.forgotPassword);

module.exports = router;
