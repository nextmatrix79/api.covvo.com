/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const Constants = require('../config/constants.config');

module.exports = {
    // SaaS company information
    companyId: {
        type: 'INTEGER',
        allowNull: false,
        references: {
            model: 'Companies',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    policyholder_name: {
        type: 'STRING',
        allowNull: false
    },
    policyholder_email: {
        type: 'STRING',
        allowNull: false
    },
    policyholder_phone: {
        type: 'STRING',
        allowNull: false
    },
    insurance_company_name: {
        type: 'STRING',
        allowNull: false
    },
    mailing_address: {
        type: 'STRING',
        allowNull: false
    },
    // claimant information
    claimant_name: {
        type: 'STRING',
        allowNull: false
    },
    claimant_email: {
        type: 'STRING',
        allowNull: false
    },
    relationship_to_policyholder: {
        type: 'STRING',
        allowNull: false
    },
    claimant_phone: {
        type: 'STRING',
        allowNull: false
    },
    // loss/incident information
    claim_type: {
        type: 'STRING',
        allowNull: false
    },
    loss_incident_datetime: {
        type: 'DATE',
    },
    loss_incident_location: {
        type: 'STRING',
        allowNull: false
    },
    loss_incident_description: {
        type: 'STRING',
        allowNull: false
    },
    // damage injuries details
    medical_treatment_received: {
        type: 'STRING',
        allowNull: false
    },
    createdById: {
        type: 'INTEGER',
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },

};
