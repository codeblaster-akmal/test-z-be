'use strict';

const db = require("../../config/db");
const { checkNupdateProductStatus, updateProductWarehouseStock } = require("./productVariantDetails.utils");

exports.list = async (req, res, next) => {
    try {
        const productVariantDetails = await db.product_variant_details.findAll();
        res.status(200).json(productVariantDetails);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const productVariantDetails = req.body;
        const newProductVariantDetail = await db.product_variant_details.create(productVariantDetails);
        res.status(201).json(newProductVariantDetail);
    } catch (error) {
        next(error);
    }
};

exports.productVariantDetailById = async (req, res, next) => {
    try {
        const productVariantDetail = await db.product_variant_details.findByPk(req.params.id);
        res.status(200).json(productVariantDetail);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { on_status } = req.query;
        const { id } = req.params;
        const productVariantDetail = req.body;
        const updateProductVariantDetail = await db.product_variant_details.update(productVariantDetail, { where: { id } });
        if (productVariantDetail.warehouseStock) {
            await updateProductWarehouseStock(productVariantDetail.warehouseStock);
        }
        if (on_status) {
            await checkNupdateProductStatus(productVariantDetail);
        }
        res.status(200).json(updateProductVariantDetail);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.product_variant_details.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (error) {
        next(error);
    }
};
