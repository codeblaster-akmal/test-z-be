const db = require("../../config/db");

exports.expiryTimeFunc = async (value) => {
    const result = await db.configurations.findOne({ where: { key: value } });
    return result;
};