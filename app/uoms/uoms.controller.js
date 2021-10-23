'use strict';

const db = require("../../config/db");

exports.list = async (req, res, next) => {
    try {
        const { attributes, sort = "name", order = "asc" } = req.query;
        let uoms = {}, args = { order: [[sort, order]] };

        if (attributes) args.attributes = attributes;

        const data = await db.uoms.findAll(args);
        uoms.data = data;
        res.status(200).json(uoms);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const uom = req.body;
        const newUom = await db.uoms.create(uom);
        res.status(201).json(newUom);
    } catch (err) {
        next(err);
    }
};

exports.uomById = async (req, res, next) => {
    try {
        const uom = await db.uoms.findByPk(req.params.id);
        res.status(200).json(uom);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const uom = req.body;
        const updateUom = await db.uoms.update(uom, { where: { id: req.params.id } });
        res.status(201).json(updateUom);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.uoms.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};