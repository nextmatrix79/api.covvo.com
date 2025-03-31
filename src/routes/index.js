/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
 
const express = require("express");
const router = express.Router();

//middleware to authenticate JWT based authentication of users and routes
const auth = require("../middlewares").auth;

//All the Authorized routes
const authorizedRoutes = require("./authorized");

//All the Unauthorized Routes
const unAuthorizedRoutes = require("./unauthorized");

router.use((req, res, next) => {
  console.log("++++++++++++++++++++")
  if (req.method === "OPTIONS") {
    res.status(200).send();
  } else {
    next();
  }
});

router.use(unAuthorizedRoutes, auth.authenticate, authorizedRoutes);

module.exports = router;
