/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports.authenticate = async (req, res, next) => {
    const authorization = req.header('Authorization');

    if (!authorization) return res.sendStatus(401); // Unauthorized

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.json({
                status: 'Fail',
                systemFailure: false,
                message: 'User not found.',
                jsonErr: { message: 'User not found.' }
            });
        }

        if (user.isTokenExpired) {
            return res.json({
                status: 'Fail',
                systemFailure: false,
                message: 'Token expired.',
                jsonErr: { message: 'Token expired.' }
            });
        }

        req.token_decoded = decoded;
        next();

    } catch (err) {
        return res.json({
            status: 'Fail',
            systemFailure: false,
            message: 'Failed to authenticate token.',
            jsonErr: { message: err.message }
        });
    }
};
