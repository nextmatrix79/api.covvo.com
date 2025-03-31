/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

'use strict';

const rawSchema = require('../schemas/user.schema');

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
            isDeleted: {type: Sequelize.BOOLEAN, defaultValue: false},
            createdAt: {allowNull: false, type: Sequelize.DATE},
            updatedAt: {allowNull: false, type: Sequelize.DATE},
            deletedAt: {type: Sequelize.DATE, allowNull: true}
        };

        await queryInterface.createTable('Users', schema);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('Users');
    }
};
