/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const { Company, CompanyType, User } = require('../models');
const logger = require("../helpers/logger");
const responseHelper = require("../helpers/response.helper");

const getAllClaims = async (req, res) => {
    console.log("getAllClaims is called");

    try {
        const companies = await Company.findAll({
            include: [
                { model: CompanyType, as: 'companyType' },
                {
                    model: User,
                    as: 'userDetails',
                    attributes: {
                        exclude: [
                            'password',
                            'resetPasswordToken',
                            'resetPasswordExpires',
                            'isTokenExpired'
                        ]
                    }
                }
            ]
        });
        return responseHelper.success(res, companies, 'Companies fetched successfully');
    } catch (err) {
        logger.error(err);
        responseHelper.systemFailure(res, err);
    }
};

module.exports = {
    getAllClaims,
};
