/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
'use strict';
const rawSchema = require("../schemas/upload.schema");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * Run the migration
     * @param queryInterface
     * @param Sequelize
     * @returns {Promise<void>}
     */
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
        await queryInterface.createTable('Uploads', schema);
    },

    /**
     * Add foreign key constraints
     * @param queryInterface
     * @param Sequelize
     * @returns {Promise<void>}
     */

    async addForeignKey(queryInterface, Sequelize) {
        await queryInterface.addConstraint('Attachments', {
            fields: ['fileId'],
            type: 'foreign key',
            name: 'fk_attachments_fileId', // optional custom name
            references: {
                table: 'Uploads',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },

    /**
     * Rollback the migration
     * @param queryInterface
     * @param Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Uploads');
    }
};