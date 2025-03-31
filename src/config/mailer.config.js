/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
    },
});

module.exports = transporter;
