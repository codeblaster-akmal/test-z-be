"use strict";

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");

exports.list = async (req, res, next) => {
  try {
    const {
      attributes,
      sort = "name",
      order = "asc",
      cities,
      cities_attr,
      cities_counties,
      cities_counties_attr,
    } = req.query;
    let warehouses = {},
      args = { order: [[sort, order]] },
      includes = [],
      cityIncludes = [];

    const citySchema = {
      ...SCHEMA.CITY,
      attributes: cities_attr
    };

    if (attributes) args.attributes = attributes;

    if (cities_counties) {
      cityIncludes.push({
        ...SCHEMA.COUNTY,
        attributes: cities_counties_attr
      });
    }

    if (cityIncludes.length) citySchema.include = cityIncludes;

    if (cities) {
      includes.push(citySchema);
    }

    if (includes.length) args.include = includes;

    const data = await db.warehouses.findAll(args);
    warehouses.data = data;
    res.status(200).json(warehouses);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newWarehouse = await db.warehouses.create(req.body);
    res.status(201).json(newWarehouse);
  } catch (error) {
    next(error);
  }
};

exports.warehouseById = async (req, res, next) => {
  try {
    const warehouse = await db.warehouses.findByPk(req.params.id);
    res.status(200).json(warehouse);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const warehouse = req.body;
    const updateWarehouse = await db.warehouses.update(warehouse, {
      where: { id: req.params.id },
    });
    res.status(200).json(updateWarehouse);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await db.warehouses.destroy({ where: { id: req.params.id } });
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};
