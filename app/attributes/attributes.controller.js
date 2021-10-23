"use strict";

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");

exports.list = async (req, res, next) => {
  try {

    const {
      attr,
      sort = "id",
      order = "asc",
      variants,
      variants_attr,
      sub_groups_attr,
      sub_groups,
      groups,
      groups_attr,
      categories,
      categories_attr,
      uoms,
      uoms_attr
    } = req.query;

    let attributes = {},
      args = { order: [[sort, order]] },
      includes = [],
      variantIncludes = [],
      subGroupIncludes = [],
      groupIncludes = [];

    const variantSchema = {
      ...SCHEMA.VARIANT,
      attributes: variants_attr
    };

    const subGroupSchema = {
      ...SCHEMA.SUBGROUP,
      attributes: sub_groups_attr
    };

    const groupSchema = {
      ...SCHEMA.GROUP,
      attributes: groups_attr
    };

    if (attr) args.attributes = attr;

    if (categories) {
      groupIncludes.push({
        ...SCHEMA.CATEGORY,
        attributes: categories_attr
      });
    }

    if (groupIncludes.length) groupSchema.include = groupIncludes;

    if (groups) {
      subGroupIncludes.push(groupSchema);
    }

    if (sub_groups) {
      variantIncludes.push(subGroupSchema);
    }

    if (subGroupIncludes.length) subGroupSchema.include = subGroupIncludes;

    if (variantIncludes.length) variantSchema.include = variantIncludes;

    if (variants) {
      includes.push(variantSchema);
    }

    if (uoms) {
      includes.push({
        ...SCHEMA.UOM,
        attributes: uoms_attr
      });
    }

    if (includes.length) args.include = includes;

    const data = await db.attributes.findAll(args);
    attributes.data = data;
    res.status(200).json(attributes);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const attribute = req.body;
    const newAttribute = await db.attributes.create(attribute);
    res.status(201).json(newAttribute);
  } catch (error) {
    next(error);
  }
};

exports.attributeById = async (req, res, next) => {
  try {
    const attribute = await db.attributes.findByPk(req.params.id);
    res.status(200).json(attribute);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const attribute = req.body;
    const { id } = req.params;

    const updateAttribute = await db.attributes.update(attribute, { where: { id } });
    res.status(200).json(updateAttribute);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await db.attributes.destroy({ where: { id: req.params.id } });
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};
