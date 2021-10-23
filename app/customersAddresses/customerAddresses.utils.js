"use strict";

const db = require("../../config/db");

exports.disableExistCustomerAddress = async (customersProfileMstId) => {
    try {
        await db.customer_addresses.update({ isDefault: false }, { where: { customersProfileMstId } });
    } catch (err) {
        throw err;
    }
};