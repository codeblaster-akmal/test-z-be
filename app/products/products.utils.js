"use strict";

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");
const { delFile } = require("../../utils/fileSystem");
const { parseJson } = require("../../utils/utils");

exports.findNrmvExistPrdImages = async productId => {
    try {
        const productImages = await db.product_images.findAll({ where: { productId } });
        productImages.forEach(async prdImg => {
            await delFile(prdImg.image);
        });
        await db.product_images.destroy({ where: { productId } });
    } catch (err) {
        throw err;
    }
};

exports.createProductImages = async (productId, reqBody, reqFiles) => {
    try {
        let checkIsDefault, isDefault = reqBody.isDefault;
        if (isDefault && Array.isArray(isDefault)) {
            checkIsDefault = isDefault.some(val => val === 'true');
            if (!checkIsDefault) isDefault[0] = 'true';
        } else {
            isDefault = ['true'];
        }

        const appendPath = reqFiles.map((file, index) => {
            return {
                image: file.path,
                productId,
                originalName: file.originalname,
                isDefault: isDefault[index]
            };
        });

        return await db.product_images.bulkCreate(appendPath);
    } catch (err) {
        throw err;
    }
};

exports.rmvFileOnError = async reqFiles => {
    try {
        reqFiles.forEach(async file => {
            await delFile(file.path);
        });
    } catch (err) {
        throw err;
    }
};

exports.checkIsReqFiles = reqFiles => {
    if (reqFiles && reqFiles.length) return true;
    return false;
};

exports.createWarehouseStock = async (productId, warehouseStock) => {
    try {
        const parseWarehouseStock = parseJson(warehouseStock);
        return await db.warehouse_stocks.create({ ...parseWarehouseStock, productId });
    } catch (err) {
        throw err;
    }
};

exports.fetchRelatedProducts = async productId => {
    try {
        return await db.related_products.findAll({
            where: { actualProductId: productId },
            attributes: ["id"],
            include: [{
                ...SCHEMA.PRODUCT,
                attributes: ["id", "name", "isVariant", "sellPrice", "retailPrice"],
                include: [{
                    ...SCHEMA.PRODUCT_IMAGE,
                    attributes: ["image"],
                    where: { isDefault: true },
                    required: false
                }, {
                    ...SCHEMA.PRODUCTS_VARIANT_DETAIL,
                    attributes: ["sellPrice", "retailPrice"],
                }]
            }]
        });
    } catch (err) {
        throw err;
    }
};

exports.updateProductVariantDetails = async (vat, productId) => {
    try {
        const data = await db.product_variant_details.findAll({ where: { productId } });

        let filterData = [];
        data.forEach(pCmb => {
            if (pCmb.retailPrice) {
                const result =
                    parseInt(pCmb.sellPrice) -
                    (parseInt(pCmb.sellPrice) * parseFloat(vat)) / 100;
                const finalResult =
                    ((parseInt(result) - parseInt(pCmb.costPrice)) * 100) /
                    parseInt(pCmb.costPrice);
                filterData.push({
                    id: pCmb.id,
                    markup: parseFloat(finalResult).toFixed(2)
                })
            }
        });

        filterData.forEach(async pvd => {
            await db.product_variant_details.update(pvd, { where: { id: pvd.id } });
        });
    } catch (error) {
        throw error;
    }
};