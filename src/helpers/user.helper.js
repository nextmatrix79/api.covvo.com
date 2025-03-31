/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {

    isUserIdExists: async (u_id) => {
        console.log("isUserIdExists HelperFunction is called");
        try {
            const user = await User.findByPk(u_id);
            return user || false;
        } catch (err) {
            return err;
        }
    },

    isUserEmailExists: async (u_email) => {
        console.log("isUserEmailExists HelperFunction is called");
        try {
            const user = await User.findOne({
                where: { email: u_email.toLowerCase() },
                attributes: ['id', 'email', 'password', 'status', 'role', 'is_verified']
            });
            return user || false;
        } catch (err) {
            return err;
        }
    },

    verifyCode: async (u_email, u_code) => {
        console.log("verifyCode HelperFunction is called");
        try {
            const user = await User.findOne({
                where: {
                    email: u_email.toLowerCase(),
                    verificationCode: u_code
                }
            });
            console.log("After User findOne called", user);
            return user || false;
        } catch (err) {
            return err;
        }
    },

    getToken: (user) => {
        console.log("getToken HelperFunction is called");
        return jwt.sign({
            id: user.id,
            a: user.status,
            n: user.firstName + ' ' + user.lastName,
            e: user.email,
            p: user.phoneNumber,
            r: user.role
        }, process.env.JWT_SECRETE);
    },

    signIn: async (data) => {
        console.log("signIn HelperFunction is called " + data.email + " " + data.password);
        const user = await User.findOne({ where: { email: data.email.toLowerCase() } });
        if (user && await user.validPassword(data.password)) {
            return user;
        }
        return false;
    },

    logout: async (userid) => {
        console.log("logout HelperFunction is called");
        const user = await User.findByPk(userid);
        if (user) {
            user.isTokenExpired = true;
            await user.save();
            return user;
        }
        return false;
    },

    verifyToken: async (token) => {
        console.log("verifyToken HelperFunction is called");
        try {
            return jwt.verify(token, process.env.JWT_SECRETE);
        } catch (err) {
            return false;
        }
    },

    updateUser: async (values) => {
        console.log("updateUser HelperFunction is called");
        try {
            const [_, [updatedUser]] = await User.update(values, {
                where: { id: values.id },
                returning: true
            });

            const token = module.exports.getToken(updatedUser);
            return { ...updatedUser.get({ plain: true }), token };
        } catch (err) {
            return err;
        }
    },

    setPassword: async (userInstance, password) => {
        console.log("setPassword HelperFunction is called");
        if (typeof userInstance.setPassword === 'function') {
            await userInstance.setPassword(password); // if defined on model
            await userInstance.save();
        } else {
            // fallback: hash manually using bcrypt if no method on model
            const bcrypt = require('bcrypt');
            userInstance.password = await bcrypt.hash(password, 10);
            await userInstance.save();
        }
    }

};