/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').user

router.post('/signup', controller.signup)
router.post('/sign-in', controller.signIn)
router.post('/verify-code', controller.verifyCode)

module.exports = router;
