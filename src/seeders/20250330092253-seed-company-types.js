'use strict';

const bcrypt = require("bcrypt");
const Constants = require("../config/constants.config");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('CompanyTypes', [
            {
                name: 'Property',
                description: 'Property related companies',
                status: Constants.statuses[0],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Automobile',
                description: 'Automobile related companies',
                status: Constants.statuses[0],
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('CompanyTypes', {
            name: ["Property", "Automobile"]
        }, {});
    }
};
