/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const express = require('express');
const router = express.Router();

//get defined routes
const userRoutes = require('./user.route')
const companyTypeRoutes = require('./companyType.route')
const companyRoutes = require('./company.route')
const claimRoutes = require('./claim.route')

//Restricted routes
router.use('/auth', userRoutes)
router.use('/company-type', companyTypeRoutes)
router.use('/company', companyRoutes)
router.use('/claim', claimRoutes)

module.exports = router;
