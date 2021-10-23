"use strict";

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");

exports.list = async (req, res, next) => {
  try {
    const {
      attributes,
      sort = "id",
      order = "asc",
      sub_groups_attr,
      sub_groups,
      groups,
      groups_attr,
      product_variants,
      product_variants_attr,
    } = req.query;

    let variants = {},
      args = { order: [[sort, order]] },
      includes = [],
      subGroupIncludes = [];

    const subGroupSchema = {
      ...SCHEMA.SUBGROUP,
      attributes: sub_groups_attr
    };

    if (attributes) args.attributes = attributes;


    if (groups) {
      subGroupIncludes.push({
        ...SCHEMA.GROUP,
        attributes: groups_attr
      });
    }

    if (subGroupIncludes.length) subGroupSchema.include = subGroupIncludes;

    if (sub_groups) {
      includes.push(subGroupSchema);
    }

    if (product_variants) {
      includes.push({
        ...SCHEMA.PRODUCTS_VARIANT,
        attributes: product_variants_attr
      });
    }

    if (includes.length) args.include = includes;

    const data = await db.variants.findAll(args);
    variants.data = data;
    res.status(200).json(variants);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const variant = req.body;
    const newVariant = await db.variants.create(variant);
    res.status(201).json(newVariant);
  } catch (error) {
    next(error);
  }
};

exports.variantById = async (req, res, next) => {
  try {
    const variant = await db.variants.findByPk(req.params.id);
    res.status(200).json(variant);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const variant = req.body;
    const { id } = req.params;

    const updateVariant = await db.variants.update(variant, { where: { id } });
    res.status(200).json(updateVariant);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await db.variants.destroy({ where: { id: req.params.id } });
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};
