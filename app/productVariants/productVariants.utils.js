"use strict";

const db = require("../../config/db");
const { delFile } = require("../../utils/fileSystem");
const { parseJson } = require("../../utils/utils");

exports.createProductVariantDetails = async productVariantDetails => {
    try {
        return await db.product_variant_details.bulkCreate(productVariantDetails);
    } catch (error) {
        throw error;
    }
};

exports.createProductAttributeImages = async (productAttributeImages, newProductVariants, reqFiles) => {
    try {
        let prdAttrImgsData = [];
        productAttributeImages.forEach((productAttributeImage, index) => {
            const attrImages = reqFiles[`attributeImage${index}`];
            attrImages.forEach((attrImage, jIndex) => {
                const newProductVariantsStringify = JSON.stringify(newProductVariants);
                const newProductVariantsParse = parseJson(newProductVariantsStringify);
                const getProductVariantId = newProductVariantsParse.find(obj => obj.attributeId === productAttributeImage.attributeId);

                prdAttrImgsData.push({
                    image: attrImage.path,
                    productId: productAttributeImage.productId,
                    productVariantId: getProductVariantId.id,
                    originalName: attrImage.originalname,
                    isPrimary: jIndex === 0 ? productAttributeImage.fileInfo.length : 0
                });
            });
        });
        return await db.product_attribute_images.bulkCreate(prdAttrImgsData);
    } catch (error) {
        throw error;
    }
};

exports.destroyProductVariants = async productId => {
    try {
        return await db.product_variants.destroy({ where: { productId } });
    } catch (error) {
        throw error;
    }
};

exports.destroyProductVariantDetails = async productId => {
    try {
        return await db.product_variant_details.destroy({ where: { productId } });
    } catch (error) {
        throw error;
    }
};

/* exports.destroyProductAttributeImages = async productId => {
    try {
        const productAttributeImages = await db.product_attribute_images.findAll({ where: { productId } });
        productAttributeImages.forEach(async attributeImage => {
            await delFile(attributeImage.image);
        });
        return await db.product_attribute_images.destroy({ where: { productId } })
    } catch (error) {
        throw error;
    }
}; */

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
    if (reqFiles) {
        let files = [];
        for (const property in reqFiles) {
            files.push(reqFiles[property]);
        }
        if (files.length) return {
            condition: true,
            files
        };
    }
    return {
        condition: false,
    };
};

exports.createWarehouseStock = async (warehouseStock, newProductVariantDetails) => {
    try {
        const newWarehouseStocks = newProductVariantDetails.map(productVariantDetail => {
            return {
                ...warehouseStock,
                productVariantDetailId: productVariantDetail.id
            }
        });
        return await db.warehouse_stocks.bulkCreate(newWarehouseStocks);
    } catch (err) {
        throw err;
    }
};