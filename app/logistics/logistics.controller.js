"use strict";

const db = require("../../config/db");

exports.list = async (req, res, next) => {
  try {
    let logistics = {};
    const data = await db.logistics.findAll(args);
    logistics.data = data;
    res.status(200).json(logistics);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const logistics = req.body;
    const newlogistics = await db.logistics.create(logistics);
    res.status(201).json(newlogistics);
  } catch (err) {
    next(err);
  }
};

exports.logisticById = async (req, res, next) => {
  try {
    const logistics = await db.logistics.findByPk(req.params.id);
    res.status(200).json(logistics);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const logistics = req.body;
    const updatelogistics = await db.logistics.update(logistics, {
      where: { id: req.params.id },
    });
    res.status(201).json(updatelogistics);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await db.logistics.destroy({ where: { id: req.params.id } });
    res.status(200).send({});
  } catch (err) {
    next(err);
  }
};
