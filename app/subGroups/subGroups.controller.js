"use strict";

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");
const { delFile } = require("../../utils/fileSystem");
const { upload } = require("../../utils/fileUpload/multer");
const imageUpload = upload.single("subGroupImage");

exports.list = async (req, res, next) => {
  try {

    const {
      attributes,
      sort = "id",
      order = "asc",
      with_prod_count,
      groups_attr,
      groups,
      variants_attr,
      variants,
      groups_categories_attr,
      groups_categories,
      variants_attributes_attr,
      variants_attributes,
      products,
      products_attr,
      products_product_images,
      products_product_images_attr,
      is_default_img_only
    } = req.query;

    let subGroups = {},
      args = { order: [[sort, order]] },
      includes = [],
      groupIncludes = [],
      variantIncludes = [],
      productIncludes = [];

    const groupSchema = {
      ...SCHEMA.GROUP,
      attributes: groups_attr
    };

    const variantSchema = {
      ...SCHEMA.VARIANT,
      attributes: variants_attr
    };

    const productSchema = {
      ...SCHEMA.PRODUCT,
      attributes: products_attr
    };

    const productImageSchema = {
      ...SCHEMA.PRODUCT_IMAGE,
      attributes: products_product_images_attr
    };

    if (attributes)
      args.attributes = attributes;

    if (with_prod_count) {
      args = {
        attributes: {
          include: [[db.Sequelize.fn("COUNT", db.Sequelize.col("products.id")), "productCount"]],
        },
        group: ['sub_group.id']
      }
      includes.push({
        ...SCHEMA.PRODUCT, attributes: []
      });
    }

    if (groups_categories) {
      groupIncludes.push({
        ...SCHEMA.CATEGORY,
        attributes: groups_categories_attr
      });
    }

    if (groupIncludes.length) groupSchema.include = groupIncludes;

    if (groups) {
      includes.push(groupSchema);
    }

    if (variants_attributes) {
      variantIncludes.push({
        ...SCHEMA.ATTRIBUTE,
        attributes: variants_attributes_attr
      });
    }

    if (variantIncludes.length) variantSchema.include = variantIncludes;

    if (variants) {
      includes.push(variantSchema);
    }

    if (is_default_img_only) {
      productImageSchema.where = { isDefault: true };
      productImageSchema.required = false;
    }

    if (products_product_images) {
      productIncludes.push(productImageSchema);
    }

    if (productIncludes.length) productSchema.include = productIncludes;

    if (products) {
      includes.push(productSchema);
    }

    if (includes.length) args.include = includes;

    const data = await db.sub_groups.findAll(args);
    subGroups.data = data;
    res.status(200).json(subGroups);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  imageUpload(req, res, async (error) => {
    if (error) {
      res.status(400).json({
        error: CONSTANTS.SINGLE_IMAGE_ERROR_MESSAGE("sub group"),
      });
    } else {
      try {
        const subGroup = req.body;
        const newSubGroup = await db.sub_groups.create({
          ...subGroup,
          image: req.file.path,
        });
        res.status(201).json(newSubGroup);
      } catch (error) {
        if (req && req.file && req.file.path) delFile(req.file.path);
        next(error);
      }
    }
  });
};

exports.subGroupById = async (req, res, next) => {
  try {
    const {
      attributes,
      groups,
      groups_attr,
      variants,
      variants_attr,
      groups_categories,
      groups_categories_attr,
      variants_attributes,
      variants_attributes_attr,
      products,
      products_attr,
      products_product_images,
      products_product_images_attr,
      is_default_img_only,
      products_product_variants,
      products_product_variants_attr,
      products_product_variant_details,
      products_product_variant_details_attr,
    } = req.query;

    const { id } = req.params;

    let subGroup = {},
      args = { where: { id } },
      includes = [],
      groupIncludes = [],
      variantIncludes = [],
      productIncludes = [];

    const groupSchema = {
      ...SCHEMA.GROUP,
      attributes: groups_attr
    };

    const variantSchema = {
      ...SCHEMA.VARIANT,
      attributes: variants_attr
    };

    const productSchema = {
      ...SCHEMA.PRODUCT,
      attributes: products_attr
    };

    const productImageSchema = {
      ...SCHEMA.PRODUCT_IMAGE,
      attributes: products_product_images_attr
    };

    if (attributes)
      args.attributes = attributes;

    if (groups_categories) {
      groupIncludes.push({
        ...SCHEMA.CATEGORY,
        attributes: groups_categories_attr
      });
    }

    if (groupIncludes.length) groupSchema.include = groupIncludes;

    if (groups) {
      includes.push(groupSchema);
    }

    if (variants_attributes) {
      variantIncludes.push({
        ...SCHEMA.ATTRIBUTE,
        attributes: variants_attributes_attr
      });
    }

    if (variantIncludes.length) variantSchema.include = variantIncludes;

    if (variants) {
      includes.push(variantSchema);
    }

    if (is_default_img_only) {
      productImageSchema.where = { isDefault: true };
      productImageSchema.required = false;
    }

    if (products_product_images) {
      productIncludes.push(productImageSchema);
    }

    if (products_product_variants) {
      productIncludes.push({
        ...SCHEMA.PRODUCTS_VARIANT,
        attributes: products_product_variants_attr
      });
    }

    if (products_product_variant_details) {
      productIncludes.push({
        ...SCHEMA.PRODUCTS_VARIANT_DETAIL,
        attributes: products_product_variant_details_attr
      });
    }

    if (productIncludes.length) productSchema.include = productIncludes;

    if (products) {
      includes.push(productSchema);
    }

    if (includes.length) args.include = includes;

    const data = await db.sub_groups.findOne(args);
    subGroup.data = data;
    res.status(200).json(subGroup);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  imageUpload(req, res, async (error) => {
    if (error) {
      res.status(400).json({
        error: CONSTANTS.SINGLE_IMAGE_ERROR_MESSAGE("sub group"),
      });
    } else {
      try {
        const { id } = req.params;
        const subGroup = req.body;

        if (req.file) {
          const getSubGroup = await db.sub_groups.findByPk(id);
          delFile(getSubGroup.image);
        }

        const data = !req.file ? subGroup : { ...subGroup, image: req.file.path };
        await db.sub_groups.update(data, { where: { id } });
        res.status(201).json(data);
      } catch (err) {
        if (req && req.file && req.file.path) delFile(req.file.path);
        next(err);
      }
    }
  });
};

exports.remove = async (req, res, next) => {
  try {
    await db.sub_groups.destroy({ where: { id: req.params.id } });
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};