"use strict";

const db = require("../../../config/db");

exports.list = async (req, res, next) => {
  try {
    const types = await db.type.findAll();
    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const type = req.body;
    const newType = await db.type.create(type);
    res.status(201).json(newType);
  } catch (error) {
    next(error);
  }
};

exports.typeById = async (req, res, next) => {
  try {
    const type = await db.type.findByPk(req.params.id);
    res.status(200).json(type);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const type = req.body;
    const newType = await db.type.update(type, {
      where: { id: req.params.id },
    });
    res.status(200).json(newType);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await db.type.destroy({ where: { id: req.params.id } });
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};
