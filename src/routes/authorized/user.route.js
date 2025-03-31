/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').user

router.get('/verify-token', controller.verifyToken)
router.get('/logout', controller.logout)

module.exports = router