/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
const corsOptions = {
    origin: '*', // Adjust according to your needs
    methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
    allowedHeaders: 'X-Requested-With,content-type,token,Authorization', // Include 'Authorization' here
    credentials: true, // If your frontend also sends cookies
};

module.exports = corsOptions;