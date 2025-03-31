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
    description: {
        type: 'STRING',
        allowNull: true
    },
    status: {
        type: 'STRING',
        defaultValue: Constants.statuses[0]
    }
};
