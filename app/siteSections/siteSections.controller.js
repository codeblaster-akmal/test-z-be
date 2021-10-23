'use strict';

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");

exports.list = async (req, res, next) => {
    try {
        const {
            attributes,
            sort = "id",
            order = "asc",
            with_prod_count,
            site_section_items,
            site_section_items_attr,
            products,
            products_attr,
            product_images,
            product_images_attr,
            is_default_img_only,
            product_variant_details,
            product_variant_details_attr,
        } = req.query;
        let siteSections = {},
            args = { order: [[sort, order]] },
            includes = [],
            siteSectionItemSchemaIncludes = [],
            productIncludes = [];

        const siteSectionItemSchema = {
            ...SCHEMA.SITE_SECTION_ITEMS,
            attributes: site_section_items_attr
        };

        const productSchema = {
            ...SCHEMA.PRODUCT,
            attributes: products_attr,
        };

        const productImageSchema = {
            ...SCHEMA.PRODUCT_IMAGE,
            attributes: product_images_attr
        };

        if (attributes) args.attributes = attributes;

        if (with_prod_count) {
            args = {
                attributes: {
                    include: [
                        [
                            db.Sequelize.fn("COUNT", db.Sequelize.col("site_section_items.id")),
                            "productCount",
                        ],
                    ],
                },
                group: ["site_section.id"],
            };
            includes.push({
                ...SCHEMA.SITE_SECTION_ITEMS,
                attributes: [],
            });
        }

        if (is_default_img_only) {
            productImageSchema.where = { isDefault: true };
            productImageSchema.required = false;
        }

        if (product_images) {
            productIncludes.push(productImageSchema);
        }

        if (product_variant_details) {
            productIncludes.push({
                ...SCHEMA.PRODUCTS_VARIANT_DETAIL,
                attributes: product_variant_details_attr
            });
        }

        if (productIncludes.length) {
            productSchema.include = productIncludes;
        }

        if (products) {
            siteSectionItemSchemaIncludes.push(productSchema);
        }

        if (siteSectionItemSchemaIncludes.length) {
            siteSectionItemSchema.include = siteSectionItemSchemaIncludes;
        }

        if (site_section_items) {
            includes.push(siteSectionItemSchema);
        }

        if (includes.length) args.include = includes;

        const data = await db.site_sections.findAll(args);
        siteSections.data = data;
        res.status(200).json(siteSections);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const siteSection = req.body;
        const newSiteSection = await db.site_sections.create(siteSection);
        res.status(201).json(newSiteSection);
    } catch (err) {
        next(err);
    }
};

exports.siteSectionById = async (req, res, next) => {
    try {
        const {
            attributes,
            site_section_items,
            site_section_items_attr,
            products,
            products_attr,
            product_images,
            product_images_attr,
            is_default_img_only
        } = req.query;

        const { id } = req.params;

        let siteSection = {},
            args = { where: { id } },
            includes = [],
            siteSectionItemSchemaIncludes = [],
            productIncludes = [];

        const siteSectionItemSchema = {
            ...SCHEMA.SITE_SECTION_ITEMS,
            attributes: site_section_items_attr
        };

        const productSchema = {
            ...SCHEMA.PRODUCT,
            attributes: products_attr,
        };

        const productImageSchema = {
            ...SCHEMA.PRODUCT_IMAGE,
            attributes: product_images_attr
        };

        if (attributes) args.attributes = attributes;

        if (is_default_img_only) {
            productImageSchema.where = { isDefault: true };
            productImageSchema.required = false;
        }

        if (product_images) {
            productIncludes.push(productImageSchema);
        }

        if (productIncludes.length) {
            productSchema.include = productIncludes;
        }

        if (products) {
            siteSectionItemSchemaIncludes.push(productSchema);
        }

        if (siteSectionItemSchemaIncludes.length) {
            siteSectionItemSchema.include = siteSectionItemSchemaIncludes;
        }

        if (site_section_items) {
            includes.push(siteSectionItemSchema);
        }

        if (includes.length) args.include = includes;

        const data = await db.site_sections.findOne(args);
        siteSection.data = data;
        res.status(200).json(siteSection);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const siteSection = req.body;
        const { siteSectionItems } = siteSection;

        await db.site_section_items.destroy({ where: { siteSectionId: id } });
        const updateSiteSection = await db.site_sections.update(siteSection, { where: { id } });
        await db.site_section_items.bulkCreate(siteSectionItems);
        res.status(200).json(updateSiteSection);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.site_sections.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};