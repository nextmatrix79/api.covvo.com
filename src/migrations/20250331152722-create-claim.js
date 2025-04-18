/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
'use strict';
const rawSchema = require("../schemas/claim.schema");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const schema = {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ...Object.fromEntries(
                Object.entries(rawSchema).map(([key, value]) => {
                    const field = {...value, type: Sequelize[value.type]};
                    return [key, field];
                })
            ),
            createdAt: {allowNull: false, type: Sequelize.DATE},
            updatedAt: {allowNull: false, type: Sequelize.DATE},
        }
        await queryInterface.createTable('Claims', schema);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Claims');
    }
};