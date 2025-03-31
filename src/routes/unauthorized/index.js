/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
 
const express = require('express');
const router = express.Router();

//get defined routes
const userRoutes = require('./user.route')

//call appropriate routes

//Un-restricted routes
router.use('/auth', userRoutes)


module.exports = router;
