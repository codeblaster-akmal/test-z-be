'use strict';

const db = require("../../config/db");

exports.list = async (req, res, next) => {
    try {
        const { attributes, sort = "name", order = "asc" } = req.query;
        let cities = {}, args = { order: [[sort, order]] };

        if (attributes) args.attributes = attributes;

        const data = await db.cities.findAll(args);
        cities.data = data;
        res.status(200).json(cities);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const city = req.body;
        const newCity = await db.cities.create(city);
        res.status(201).json(newCity);
    } catch (err) {
        next(err);
    }
};

exports.cityById = async (req, res, next) => {
    try {
        const city = await db.cities.findByPk(req.params.id);
        res.status(200).json(city);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const city = req.body;
        const updateCity = await db.cities.update(city, { where: { id: req.params.id } });
        res.status(201).json(updateCity);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.cities.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};