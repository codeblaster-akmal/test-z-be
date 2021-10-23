"use strict";

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");

exports.list = async (req, res, next) => {
  try {
    const orderItems = await db.order_items.findAll();
    res.status(200).json(orderItems);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
    try {
        const orderItem = req.body;
        const newOrderItem = await db.order_items.create(orderItem);
        res.status(201).json(newOrderItem);
    } catch (err) {
        next(err);
    }
};

exports.orderItemsById = async (req, res, next) => {
  try {
    const orderItem = await db.order_items.findByPk(req.params.id);
    res.status(200).json(orderItem);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
    try {
        const orderItem = req.body;
        const updateOrderItem = await db.order_items.update(orderItem, { where: { id: req.params.id } });
        res.status(201).json(updateOrderItem);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.order_items.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};
