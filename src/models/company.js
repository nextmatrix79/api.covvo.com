/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
'use strict';
const { Model } = require('sequelize');
const rawSchema = require("../schemas/company.schema");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.belongsTo(models.CompanyType, {
        foreignKey: 'companyTypeId',
        as: 'companyType'
      });

      Company.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'userDetails'
      });
    }
  }

  const modelSchema = Object.fromEntries(
      Object.entries(rawSchema).map(([key, value]) => {
        const field = { ...value, type: DataTypes[value.type] };
        return [key, field];
      })
  );

  Company.init(modelSchema, {
    sequelize,
    modelName: 'Company',
    timestamps: true,
  });

  return Company;
};