/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const Constants = require('../config/constants.config');

module.exports = {
    userId: {
        type: 'INTEGER',
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    name: {
        type: 'STRING',
        allowNull: false
    },
    companyTypeId: {
        type: 'INTEGER',
        allowNull: false,
        references: {
            model: 'CompanyTypes',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    companyAddress: {
        type: 'STRING',
        allowNull: true
    },
    zipCode: {
        type: 'STRING',
        allowNull: true
    },

};
