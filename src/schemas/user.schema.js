/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const Constants = require('../config/constants.config');

module.exports = {
    name: {
        type: 'STRING',
        allowNull: false
    },
    email: {
        type: 'STRING',
        allowNull: false
    },
    phone: {
        type: 'STRING',
        allowNull: false
    },
    password: {
        type: 'STRING',
        allowNull: false
    },
    role: {
        type: 'STRING',
        allowNull: false,
        defaultValue: Constants.roles[2]
    },
    isTokenExpired: {
        type: 'BOOLEAN',
        defaultValue: false
    },
    isVerified: {
        type: 'BOOLEAN',
        defaultValue: false
    },
    verificationCode: {
        type: 'STRING',
        allowNull: true
    },
    resetPasswordToken: {
        type: 'STRING',
        allowNull: true
    },
    resetPasswordExpires: {
        type: 'DATE',
        allowNull: true
    },
    status: {
        type: 'STRING',
        defaultValue: Constants.statuses[0]
    }
};
