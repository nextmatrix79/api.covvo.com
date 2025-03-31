/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const { CompanyType } = require('../models');
const logger = require("../helpers/logger");
const responseHelper = require("../helpers/response.helper");

const getAllCompanyTypes = async (req, res) => {
    console.log("getAllCompanyTypes is called");

    try {
        const companyTypes = await CompanyType.findAll();
        return responseHelper.success(res, companyTypes, 'Company Types fetched successfully');
    } catch (err) {
        logger.error(err);
        responseHelper.systemFailure(res, err);
    }
};

module.exports = {
    getAllCompanyTypes,
};
