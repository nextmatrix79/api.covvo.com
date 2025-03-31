/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').claim

router.get('/get-all', controller.getAllClaims)

module.exports = router