'use strict';

const bcrypt = require('bcrypt');
const Constants = require('../config/constants.config');

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Seed Users
    const users = [
      {
        name: 'Super Admin User',
        email: 'admin@covvo.com',
        phone: '1234567890',
        password: await bcrypt.hash('admin123', 10),
        role: Constants.roles[0],
        isVerified: true,
        isTokenExpired: false,
        status: Constants.statuses[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'IC Admin User',
        email: 'icadmin@covvo.com',
        phone: '1234567890',
        password: await bcrypt.hash('icadmin123', 10),
        role: Constants.roles[2],
        isVerified: true,
        isTokenExpired: false,
        status: Constants.statuses[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'IC Rep User',
        email: 'icrep@covvo.com',
        phone: '1234567890',
        password: await bcrypt.hash('icrep123', 10),
        role: Constants.roles[2],
        isVerified: true,
        isTokenExpired: false,
        status: Constants.statuses[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adjuster One',
        email: 'adjuster1@covvo.com',
        phone: '9876543210',
        password: await bcrypt.hash('user123', 10),
        role: Constants.roles[1],
        isVerified: true,
        isTokenExpired: false,
        status: Constants.statuses[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adjuster Two',
        email: 'adjuster2@covvo.com',
        phone: '9876543210',
        password: await bcrypt.hash('user123', 10),
        role: Constants.roles[1],
        isVerified: true,
        isTokenExpired: false,
        status: Constants.statuses[0],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});

    // 2. Get IC Admin User ID
    const [adminUser] = await queryInterface.sequelize.query(
        `SELECT id FROM "Users" WHERE email = 'icadmin@covvo.com' LIMIT 1;`,
        { type: Sequelize.QueryTypes.SELECT }
    );

    // 3. Get CompanyType ID
    const [companyType] = await queryInterface.sequelize.query(
        `SELECT id FROM "CompanyTypes" WHERE name = 'Property' LIMIT 1;`,
        { type: Sequelize.QueryTypes.SELECT }
    );

    // 4. Insert Company
    await queryInterface.bulkInsert('Companies', [
      {
        name: 'Test Insurance Company LLC',
        userId: adminUser?.id,
        companyTypeId: companyType?.id || 1,
        companyAddress: '123 Covvo Street',
        zipCode: '12345',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', {
      name: 'IC Admin Company'
    });

    await queryInterface.bulkDelete('Users', {
      email: [
        "admin@covvo.com",
        "icadmin@covvo.com",
        "icrep@covvo.com",
        "adjuster1@covvo.com",
        "adjuster2@covvo.com"
      ]
    });
  }
};