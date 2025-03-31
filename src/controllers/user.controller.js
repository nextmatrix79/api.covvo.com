/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const { User } = require('../models');
const _ = require('lodash');
const userHelper = require('../helpers/user.helper');
const logger = require("../helpers/logger");
const responseHelper = require("../helpers/response.helper");
const randomize = require('randomatic');
const { jwt } = require("twilio");
const { sendMail } = require("../config").mailer;

const getProfileFromId = async (req, res) => {
    console.log("getProfileFromId is called");
    const { uid } = req.query;

    try {
        const user = await userHelper.isUserIdExists(uid);
        if (user) {
            return responseHelper.success(res, user, 'User fetched successfully');
        } else {
            return responseHelper.requestFailure(res, 'User does not exist');
        }
    } catch (err) {
        logger.error(err);
        responseHelper.systemFailure(res, err);
    }
};

const signup = async (req, res) => {
    console.log("signup is called");
    const userData = req.body;
    userData.email = userData.email.toLowerCase();

    try {
        const exists = await userHelper.isUserEmailExists(userData.email);
        if (exists) {
            return responseHelper.requestFailure(res, "Email already exists");
        }

        userData.verificationCode = randomize('0', 6);
        const newUser = await User.create(userData);

        // Set password after creation (assumes a setter hook or manual hash logic)
        await userHelper.setPassword(newUser, userData.password);

        const user = await userHelper.signIn({
            email: userData.email,
            password: userData.password
        });

        const token = userHelper.getToken(user);
        const responseData = _.omit(user, ['password']);
        responseHelper.success(res, responseData, 'Successfully Signed Up User', token);
    } catch (err) {
        logger.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            responseHelper.requestFailure(res, "Duplicate User not allowed");
        } else {
            responseHelper.requestFailure(res, err);
        }
    }
};

const signIn = async (req, res) => {
    console.log("signIn is called");
    const userData = req.body;
    userData.email = userData.email.toLowerCase();

    try {
        const user = await userHelper.signIn(userData);
        if (!user) {
            return responseHelper.requestFailure(res, "Invalid Email or Password");
        }

        const token = userHelper.getToken(user);
        const responseData = _.omit(user, ['password']);
        responseHelper.success(res, responseData, 'Successfully Signed In', token);
    } catch (err) {
        logger.error(err);
        responseHelper.requestFailure(res, err);
    }
};

const verifyCode = async (req, res) => {
    console.log("verifyCode is called");
    const { email, verificationCode } = req.body;

    try {
        const user = await userHelper.verifyCode(email, verificationCode.toString());
        if (!user) {
            return responseHelper.requestFailure(res, "Invalid Code");
        }

        const updatedUser = await userHelper.updateUser({ id: user.id, isVerified: true });
        const responseData = _.omit(updatedUser, ['password']);
        responseData.new_user = false;

        responseHelper.success(res, responseData, "Code verified successfully", updatedUser.token);
    } catch (err) {
        logger.error(err);
        responseHelper.requestFailure(res, err);
    }
};

const logout = async (req, res) => {
    console.log("logout is called");
    const { id } = req.token_decoded;

    try {
        const user = await userHelper.logout(id);
        if (!user) {
            return responseHelper.requestFailure(res, "User not found");
        }

        responseHelper.success(res, user, "User Logged Out successfully");
    } catch (err) {
        responseHelper.requestFailure(res, err);
    }
};

const verifyToken = async (req, res) => {
    console.log("verifyToken is called");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const user = await userHelper.verifyToken(token);
        if (!user) {
            return responseHelper.requestFailure(res, "Invalid Token");
        }

        const profile = await userHelper.isUserIdExists(user.id);
        responseHelper.success(res, _.omit(profile, ['password']), "Token verified successfully");
    } catch (err) {
        responseHelper.requestFailure(res, err);
    }
};

module.exports = {
    logout,
    signup,
    signIn,
    verifyCode,
    getProfileFromId,
    verifyToken
};
