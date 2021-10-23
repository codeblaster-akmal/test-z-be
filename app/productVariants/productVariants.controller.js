'use strict';

const db = require("../../config/db");
const { upload } = require("../../utils/fileUpload/multer");
const { CONSTANTS } = require("../../utils/constants");
const { createProductVariantDetails, createProductAttributeImages, destroyProductVariants, rmvFileOnError, checkIsReqFiles, createWarehouseStock } = require("./productVariants.utils");
const { parseJson } = require("../../utils/utils");

exports.list = async (req, res, next) => {
    try {
        const productVariants = await db.product_variants.findAll();
        res.status(200).json(productVariants);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { attribute_image_len } = req.query;
        let uploadArr = []
        for (let i = 0; i < +attribute_image_len; i++) {
            uploadArr.push({ name: `attributeImage${[i]}` });
        }
        const imageUpload = upload.fields(uploadArr);
        imageUpload(req, res, async (err) => {
            if (err) {
                res.status(400).json({
                    error: CONSTANTS.MAXIMUM_PRODUCT_VARIANT_ATTRIBUTES_ERROR_MESSAGE
                });
            } else {
                const productVariant = req.body;
                const parseProductVariant = parseJson(productVariant.payload);
                const { product, productVariants, productVariantDetails, productAttributeImages, productId } = parseProductVariant;
                let response = {};
                await db.products.update(product, { where: { id: productId } });
                const newProductVariants = await db.product_variants.bulkCreate(productVariants);
                response.newProductVariants = newProductVariants;
                const newProductVariantDetails = await createProductVariantDetails(productVariantDetails);
                response.newProductVariantDetails = newProductVariantDetails;
                response.warehouseStock = await createWarehouseStock(parseProductVariant.warehouseStock, newProductVariantDetails);
                await createProductAttributeImages(productAttributeImages, newProductVariants, req.files);
                res.status(201).json(response);
            }
        });
    } catch (err) {
        const { condition, files } = checkIsReqFiles(req.files);
        if (condition) await rmvFileOnError(files);
        next(err);
    }
};

exports.productVariantById = async (req, res, next) => {
    try {
        const productVariant = await db.product_variants.findByPk(req.params.id);
        res.status(200).json(productVariant);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        let test = [{
            name: 'avatar1',
            maxCount: 1
        }, {
            name: 'avatar2',
            // maxCount: 5
        }];
        const imageUpload = upload.fields(test);
        imageUpload(req, res, async (err) => {
            if (err) {
                res.status(400).json({
                    error: CONSTANTS.MAXIMUM_PRODUCT_VARIANT_ATTRIBUTES_ERROR_MESSAGE
                });
            } else {
                const { id } = req.params;
                const productVariant = req.body;
                const { productVariantDetails } = productVariant;
                await destroyProductVariants(id);

                const newProductVariant = await db.product_variants.bulkCreate(productVariant);
                await createProductVariantDetails(productVariantDetails);
                await createProductAttributeImages(newProductVariant, req.files, id);
                res.status(201).json(newProductVariant);
            }
        });
    } catch (err) {
        if (checkIsReqFiles(req.files)) await rmvFileOnError(req.files);
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { del_product_variant_details, is_product_id } = req.query;
        const { id } = req.params;
        let whereObj = { id };

        if (is_product_id) {
            whereObj = { productId: id }
        }

        if (del_product_variant_details) {
            await db.product_variant_details.destroy({ where: whereObj });
        }
        
        await db.product_variants.destroy({ where: whereObj });
        res.status(200).send({});
    } catch (error) {
        next(error);
    }
};
