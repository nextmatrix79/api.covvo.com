/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const Constants = require('../config/constants.config'); // Optional, if needed

module.exports = {
    fileId: {
        type: 'INTEGER',
        allowNull: false,
        // references: {
        //     model: 'Uploads',
        //     key: 'id',
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
    },
    name: {
        type: 'STRING',
        allowNull: false,
    },
    description: {
        type: 'TEXT',
        allowNull: true,
    },
    modelType: {
        type: 'STRING',
        allowNull: false,
        comment: 'E.g., Post, Product, Comment, etc.',
    },
    modelId: {
        type: 'INTEGER',
        allowNull: false,
        comment: 'ID of the record in the corresponding modelType',
    },
};
