/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
'use strict';
const rawSchema = require("../schemas/attachment.schema");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const schema = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ...Object.fromEntries(
          Object.entries(rawSchema).map(([key, value]) => {
            const field = {
              ...value,
              type: Sequelize[value.type],
            };

            if (value.references) {
              field.references = value.references;
              field.onUpdate = value.onUpdate;
              field.onDelete = value.onDelete;
            }

            if (value.comment) {
              field.comment = value.comment;
            }

            return [key, field];
          })
      ),
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    };

    await queryInterface.createTable('Attachments', schema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Attachments');
  }
};
