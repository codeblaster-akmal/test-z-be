'use strict';

const db = require("../../config/db");

exports.list = async (req, res, next) => {
    try {
        const { attributes, sort = "id", order = "asc" } = req.query;
        let warehouseStocks = {}, args = { order: [[sort, order]] };

        if (attributes) args.attributes = attributes;

        const data = await db.warehouse_stocks.findAll(args);
        warehouseStocks.data = data;
        res.status(200).json(warehouseStocks);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const warehouseStock = req.body;
        const newWarehouseStock = await db.warehouse_stocks.create(warehouseStock);
        res.status(201).json(newWarehouseStock);
    } catch (err) {
        next(err);
    }
};

exports.warehouseStockById = async (req, res, next) => {
    try {
        const warehouseStock = await db.warehouse_stocks.findByPk(req.params.id);
        res.status(200).json(warehouseStock);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const warehouseStock = req.body;
        const updateWarehouseStock = await db.warehouse_stocks.update(warehouseStock, { where: { id: req.params.id } });
        res.status(201).json(updateWarehouseStock);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.warehouse_stocks.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};