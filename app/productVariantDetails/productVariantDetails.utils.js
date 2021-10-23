"use strict";

const db = require("../../config/db");

exports.checkNupdateProductStatus = async productVariantDetail => {
    try {
        const { productId } = productVariantDetail;
        const productVariantDetails = await db.product_variant_details.findAll({ where: { productId } });
        const check = productVariantDetails.some(v => v.status);
        if (!check) {
            await db.products.update(productVariantDetail, { where: { id: productId } });
        } else {
            await db.products.update({ status: true }, { where: { id: productId } });
        }
    } catch (err) {
        throw err;
    }
};

exports.updateProductWarehouseStock = async warehouseStock => {
    try {
        const { warehouseId, productVariantDetailId } = warehouseStock;
        await db.warehouse_stocks.update(warehouseStock, { where: { warehouseId, productVariantDetailId } });
    } catch (err) {
        throw err;
    }
};