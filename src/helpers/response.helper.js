/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
const _ = require('lodash');

let success = (response, data, message, token) => {
    let successResponse = {
        status: 'Success',
        message: message
    };
    let status = 200;
    if (data) {
        _.extend(successResponse, {
            data: data
        });
    }
    if (token) {
        _.extend(successResponse, {
            token: token
        });
    }

    response.status(status).json(successResponse);
};

let systemFailure = (response, err) => {
    let message = [
        'Error in handling this request. ',
        'Please contact system admin.'
    ].join('');
    let status = 500;

    if (typeof err === 'object' && err.message) {
        message = err.message;
    }

    response.status(status).json({
        status: 'Fail',
        systemFailure: true,
        message: message,
        data: null
    });
};

let requestFailure = (response, err, jsonErr = null) => {
    let status = 400;
    let message;
    if (typeof err === 'object' && err.message) {
        message = err.message;
    } else {
        message = err;
    }

    response.status(status).json({
        status: 'Fail',
        systemFailure: false,
        message: message,
        jsonErr: jsonErr
    });
};

let badRequest = (response, message) => {
    let status = 400;
    response.status(status).json({
        status: 'Fail',
        systemFailure: false,
        message: message,
        data: null
    });
};

module.exports = {
    success,
    badRequest,
    systemFailure,
    requestFailure
};
