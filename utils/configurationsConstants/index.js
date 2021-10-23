const db = require("../../config/db");

export const configurationsConstants = async (value) => {
    const result = await db.configurations.findOne({ where: { key: value } });
    return result;
};