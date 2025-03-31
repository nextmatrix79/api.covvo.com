'use strict';
const rawSchema = require("../schemas/companyType.schema");
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
      isDeleted: {type: Sequelize.BOOLEAN, defaultValue: false},
      createdAt: {allowNull: false, type: Sequelize.DATE},
      updatedAt: {allowNull: false, type: Sequelize.DATE},
      deletedAt: {type: Sequelize.DATE, allowNull: true}
    }
    await queryInterface.createTable('CompanyTypes', schema);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CompanyTypes');
  }
};