"use strict";

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");

exports.list = async (req, res, next) => {
    try {
        const {
            attributes,
            sort = "id",
            order = "asc",
            customer_id,
            products,
            products_attr,
            product_images,
            product_images_attr,
            is_default_img_only,
            product_variants,
            product_variants_attr,
            product_variant_details,
            product_variant_details_attr,
            product_variants_attributes,
            product_variants_attributes_attr,
            product_variants_variants,
            product_variants_variants_attr,
            product_variants_product_attribute_images,
            product_variants_product_attribute_images_attr,
            warehouse_stocks,
            warehouse_stocks_attr,
        } = req.query;

        let carts = {},
            args = { order: [[sort, order]] },
            cartFilter = [],
            includes = [],
            productIncludes = [],
            productVariantIncludes = [];

        const productSchema = {
            ...SCHEMA.PRODUCT,
            attributes: products_attr
        };

        const productImageSchema = {
            ...SCHEMA.PRODUCT_IMAGE,
            attributes: product_images_attr
        };

        const warehouseStockSchema = {
            ...SCHEMA.WAREHOUSE_STOCKS,
            attributes: warehouse_stocks_attr
        };

        const productVariantSchema = {
            ...SCHEMA.PRODUCTS_VARIANT,
            attributes: product_variants_attr
        };

        if (attributes) args.attributes = attributes;

        const customerWhereCondition = { customersProfileMstId: customer_id };

        if (customer_id) {
            cartFilter.push(customerWhereCondition);
        }

        const cartWhereConditions = { [db.Sequelize.Op.and]: cartFilter };

        if (cartFilter.length > 0) {
            args.where = cartWhereConditions;
            args.required = true;
        }

        if (is_default_img_only) {
            productImageSchema.where = { isDefault: true };
            productImageSchema.required = false;
        }

        if (product_images) {
            productIncludes.push(productImageSchema);
        }

        if (warehouse_stocks) {
            productIncludes.push(warehouseStockSchema);
        }

        if (product_variants_product_attribute_images) {
            productVariantIncludes.push({
                ...SCHEMA.PRODUCT_ATTRIBUTE_IMAGE,
                attributes: product_variants_product_attribute_images_attr
            });
        }

        if (product_variants_attributes) {
            productVariantIncludes.push({
                ...SCHEMA.ATTRIBUTE,
                attributes: product_variants_attributes_attr
            });
        }

        if (product_variants_variants) {
            productVariantIncludes.push({
                ...SCHEMA.VARIANT,
                attributes: product_variants_variants_attr
            });
        }

        if (productVariantIncludes.length) {
            productVariantSchema.include = productVariantIncludes;
        }

        if (product_variants) {
            productIncludes.push(productVariantSchema);
        }

        if (product_variant_details) {
            productIncludes.push({
                ...SCHEMA.PRODUCTS_VARIANT_DETAIL,
                attributes: product_variant_details_attr
            });
        }

        if (productIncludes.length) productSchema.include = productIncludes;

        if (products) {
            includes.push(productSchema);
        }

        if (includes.length) args.include = includes;

        const data = await db.carts.findAll(args);
        carts.data = data;
        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { customerId, cartItems } = req.body;

        await db.carts.destroy({ where: { customersProfileMstId: customerId } });
        const newCart = await db.carts.bulkCreate(cartItems);
        res.status(201).json(newCart);
    } catch (error) {
        next(error);
    }
};

exports.cartById = async (req, res, next) => {
    try {
        const cart = await db.carts.findByPk(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {

    try {
        const { id } = req.params;
        const cart = req.body;
        const updateCart = await db.carts.update(cart, { where: { id } });
        res.status(201).json(updateCart);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await db.carts.destroy({ where: { id } });
        res.status(200).send({});
    } catch (error) {
        next(error);
    }
};
