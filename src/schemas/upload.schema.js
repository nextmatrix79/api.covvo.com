/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.1
 */

const Constants = require('../config/constants.config');

module.exports = {
    originalName: {
        type: 'STRING',
        allowNull: false,
        comment: 'Original file name',
    },
    newName: {
        type: 'STRING',
        allowNull: false,
        comment: 'Original file name',
    },
    path: {
        type: 'STRING',
        allowNull: false,
        comment: 'Path where the file is stored in the system',
    },
    mimeType: {
        type: 'STRING',
        allowNull: true,
        comment: 'MIME type of the file (e.g. image/jpeg)',
    },
    size: {
        type: 'INTEGER',
        allowNull: true,
        comment: 'File size in bytes',
    },
};
