"use strict";

const db = require("../../config/db");
const { CONSTANTS } = require("../../utils/constants");
const {
  sequenceGenerator,
  updateSequence,
} = require("../../utils/dbUtils/sequenceGenerator");
const { createOrderItems } = require("./orders.utils");

exports.list = async (req, res, next) => {
  try {
    const orders = await db.orders.findAll();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { uniqueId, startValue, seqId } = await sequenceGenerator(CONSTANTS.ORDER_SEQ_GEN, CONSTANTS.ORDER_SEQ_GEN);
    const { order, orderItems } = req.body;
    order.orderNumber = uniqueId;
    const newOrder = await db.orders.create(order);
    await createOrderItems(orderItems);
    await updateSequence(seqId, { startValue: startValue + 1 });
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

exports.orderById = async (req, res, next) => {
  try {
    const order = await db.orders.findByPk(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const order = req.body;
    const updateOrder = await db.orders.update(order, {
      where: { id: req.params.id },
    });
    res.status(201).json(updateOrder);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await db.orders.destroy({ where: { id: req.params.id } });
    res.status(200).send({});
  } catch (err) {
    next(err);
  }
};
