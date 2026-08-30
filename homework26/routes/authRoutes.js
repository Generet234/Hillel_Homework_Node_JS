const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const createAdminFunction = require('../scripts/createAdmin.js');

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/logout', authController.removingRefreshTokenAndCookie)

router.post('/refresh', authController.checkingRefreshTokenAndUpdatingIt)

router.get('/me', authController.getInfoFromBase)

router.post('/', createAdminFunction)
module.exports = router;