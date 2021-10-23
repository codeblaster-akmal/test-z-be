'use strict';

const db = require("../../../config/db");

exports.list = async (req, res, next) => {
    try {
        const subTypes = await db.subType.findAll();
        res.status(200).json(subTypes);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
  try {
    const subType = req.body;
    const newType = await db.subType.create(subType);
    res.status(201).json(newType);
  } catch (error) {
    next(error);
  }
};

exports.subTypeById = async (req, res, next) => {
    try {
        const subType = await db.subType.findByPk(req.params.id);
        res.status(200).json(subType);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
  try {
    const subType = req.body;
      const newType = await db.subType.update(
        subType,
        { where: { id: req.params.id } }
      );
      res.status(200).json(newType);
    }
   catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
    try {
        await db.subType.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (error) {
        next(error);
    }
};