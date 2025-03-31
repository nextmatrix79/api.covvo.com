/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Construct the URI based on the environment
function constructPostgresUri() {
    if (process.env.NODE_ENV === 'local') {
        return `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    } else {
        return `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`;
    }
}

const uri = constructPostgresUri();

console.log(`Attempting to connect to PostgreSQL URI: ${uri}`);

// Connect to PostgreSQL using Sequelize
const sequelize = new Sequelize(uri, {
    dialect: 'postgres',
    logging: false, // Set true to enable SQL query logging
    dialectOptions: {
        ssl: process.env.NODE_ENV !== 'local' ? { require: true, rejectUnauthorized: false } : false
    }
});

// Test the connection
sequelize.authenticate()
    .then(() => console.log(`Sequelize connected successfully to URI: ${uri}`))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;