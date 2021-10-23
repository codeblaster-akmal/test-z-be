'use strict';

const db = require("../../config/db");
const { getRelatedProductsById } = require("./relatedProducts.utils");

exports.list = async (req, res, next) => {
    try {
        const { attributes } = req.query;
        let relatedProducts = {}, args = {};

        if (attributes)
            args.attributes = attributes;

        const data = await db.related_products.findAll(args);
        relatedProducts.data = data;
        res.status(200).json(relatedProducts);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const relatedProduct = req.body;
        let response = {};
        const { productId, product, relatedProducts } = relatedProduct;
        await db.products.update(product, { where: { id: productId } });
        await db.related_products.destroy({ where: { actualProductId: productId } });
        if (relatedProducts) {
            await db.related_products.bulkCreate(relatedProducts);
            response.newRelatedProducts = await getRelatedProductsById(productId);
        }
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

exports.relatedProductById = async (req, res, next) => {
    try {
        const relatedProduct = await db.related_products.findByPk(req.params.id);
        res.status(200).json(relatedProduct);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const relatedProduct = req.body;
        const updateRelatedProduct = await db.related_products.bulkCreate(relatedProduct);
        res.status(200).json(updateRelatedProduct);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { is_product_id } = req.query;

        await db.related_products.destroy({ where: { [is_product_id ? "actualProductId" : "id"]: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};