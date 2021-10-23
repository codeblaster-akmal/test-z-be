'use strict';

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");

exports.getRelatedProductsById = async actualProductId => {
    return await db.related_products.findAll({
        where: { actualProductId },
        include: [{
            ...SCHEMA.PRODUCT,
            attributes: ["id", "name"],
            include: [{
                ...SCHEMA.PRODUCT_IMAGE,
                attributes: ["image"],
                where: { isDefault: true },
                required: false
            }]
        }]
    });
};