"use strict";

const db = require("../../config/db");
const { CONSTANTS } = require("../../utils/constants");
const { SCHEMA } = require("../../utils/dbUtils/schema");
const { delFile } = require("../../utils/fileSystem");
const { upload } = require("../../utils/fileUpload/multer");
const imageUpload = upload.single("groupImage");

exports.list = async (req, res, next) => {
  try {
    const {
      attributes,
      sort = "id",
      order = "asc",
      categories,
      categories_attr,
      sub_groups,
      sub_groups_attr,
      sub_groups_products,
      sub_groups_products_attr,
    } = req.query;

    let groups = {},
      args = { order: [[sort, order]] },
      includes = [],
      subGroupIncludes = [];

    const subGroupSchema = {
      ...SCHEMA.SUBGROUP,
      attributes: sub_groups_attr
    };

    if (attributes) args.attributes = attributes;

    if (categories) {
      includes.push({
        ...SCHEMA.CATEGORY,
        attributes: categories_attr
      });
    }

    if (sub_groups_products) {
      subGroupIncludes.push({
        ...SCHEMA.PRODUCT,
        attributes: sub_groups_products_attr
      });
    }

    if (subGroupIncludes.length) subGroupSchema.include = subGroupIncludes;

    if (sub_groups) {
      includes.push(subGroupSchema);
    }

    if (includes.length) args.include = includes;

    const data = await db.groups.findAll(args);
    groups.data = data;
    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  imageUpload(req, res, async (error) => {
    if (error) {
      res.status(400).json({
        error: CONSTANTS.SINGLE_IMAGE_ERROR_MESSAGE("group"),
      });
    } else {
      try {
        const group = req.body;
        const newGroup = await db.groups.create({
          ...group,
          image: !req.file ? CONSTANTS.GROUP_DEFAULT_IMAGE : req.file.path,
        });
        res.status(201).json(newGroup);
      } catch (error) {
        if (req && req.file && req.file.path) delFile(req.file.path);
        next(error);
      }
    }
  });
};

exports.groupById = async (req, res, next) => {
  try {
    const {
      attributes,
      sub_groups,
      sub_groups_attr,
      sub_groups_products,
      sub_groups_products_attr,
      products_product_images,
      products_product_images_attr,
      is_default_img_only,
      products_product_variants,
      products_product_variants_attr,
      sub_groups_variants,
      sub_groups_variants_attr,
      sub_groups_variants_attributes,
      sub_groups_variants_attributes_attr,
      products_product_variant_details,
      products_product_variant_details_attr,
    } = req.query;

    const { id } = req.params;

    let group = {},
      args = { where: { id } },
      includes = [],
      subGroupIncludes = [],
      productIncludes = [],
      variantIncludes = [];

    const subGroupSchema = {
      ...SCHEMA.SUBGROUP,
      attributes: sub_groups_attr
    };

    const productSchema = {
      ...SCHEMA.PRODUCT,
      attributes: sub_groups_products_attr
    };

    const productImageSchema = {
      ...SCHEMA.PRODUCT_IMAGE,
      attributes: products_product_images_attr
    };

    const variantSchema = {
      ...SCHEMA.VARIANT,
      attributes: sub_groups_variants_attr
    };

    if (attributes) args.attributes = attributes;

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

    if (sub_groups_products) {
      subGroupIncludes.push(productSchema);
    }

    if (sub_groups_variants_attributes) {
      variantIncludes.push({
        ...SCHEMA.ATTRIBUTE,
        attributes: sub_groups_variants_attributes_attr
      });
    }

    if (variantIncludes.length) variantSchema.include = variantIncludes;

    if (sub_groups_variants) {
      subGroupIncludes.push(variantSchema);
    }

    if (subGroupIncludes.length) subGroupSchema.include = subGroupIncludes;

    if (sub_groups) {
      includes.push(subGroupSchema);
    }

    if (includes.length) args.include = includes;

    const data = await db.groups.findOne(args);
    group.data = data;
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  imageUpload(req, res, async (error) => {
    if (error) {
      res.status(400).json({
        error: CONSTANTS.SINGLE_IMAGE_ERROR_MESSAGE("group"),
      });
    } else {
      try {
        const { id } = req.params;
        const group = req.body;

        if (req.file) {
          const getGroup = await db.groups.findByPk(id);

          if (getGroup.image !== CONSTANTS.GROUP_DEFAULT_IMAGE) {
            delFile(getGroup.image);
          }
        }

        const data = !req.file ? group : { ...group, image: req.file.path };
        await db.groups.update(data, { where: { id } });
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
    await db.groups.destroy({ where: { id: req.params.id } });
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};
