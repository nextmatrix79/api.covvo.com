/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
'use strict';
const { Model } = require('sequelize');
const rawSchema = require('../schemas/user.schema');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // associations
    }

    async validPassword(password) {
      const bcrypt = require('bcrypt');
      return await bcrypt.compare(password, this.password);
    }

    async setPassword(password) {
      const bcrypt = require('bcrypt');
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(password, salt);
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      delete values.resetPasswordToken;
      delete values.resetPasswordExpires;
      delete values.isTokenExpired;
      return values;
    }
  }

  const modelSchema = Object.fromEntries(
      Object.entries(rawSchema).map(([key, value]) => {
        const field = { ...value, type: DataTypes[value.type] };
        return [key, field];
      })
  );

  User.init(modelSchema, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    paranoid: true
  });

  return User;
};