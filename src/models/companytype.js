/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
'use strict';
const {
    Model
} = require('sequelize');
const rawSchema = require("../schemas/companyType.schema");
module.exports = (sequelize, DataTypes) => {
    class CompanyType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define the relationship: CompanyType → Companies
            CompanyType.hasMany(models.Company, {
                foreignKey: 'companyTypeId',
                as: 'companies'
            });
        }
    }

    const modelSchema = Object.fromEntries(
        Object.entries(rawSchema).map(([key, value]) => {
            const field = {...value, type: DataTypes[value.type]};
            return [key, field];
        })
    );

    CompanyType.init(modelSchema, {
        sequelize,
        modelName: 'CompanyType',
        timestamps: true,
        paranoid: true
    });

    return CompanyType;
};