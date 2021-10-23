'use strict';

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");

exports.list = async (req, res, next) => {
    try {
        const { attributes, sort = "name", order = "asc", cities, cities_attr } = req.query;
        let counties = {}, args = { order: [[sort, order]] }, includes = [];

        if (attributes) args.attributes = attributes;

        if (cities) args.attributes = attributes;

        if (cities) {
            includes.push({
                ...SCHEMA.CITY,
                attributes: cities_attr
            });
        }

        if (includes.length) args.include = includes;

        const data = await db.counties.findAll(args);
        counties.data = data;
        res.status(200).json(counties);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const county = req.body;
        const newCounty = await db.counties.create(county);
        res.status(201).json(newCounty);
    } catch (err) {
        next(err);
    }
};

exports.countyById = async (req, res, next) => {
    try {
        const county = await db.counties.findByPk(req.params.id);
        res.status(200).json(county);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const country = req.body;
        const updateCountry = await db.counties.update(country, { where: { id: req.params.id } });
        res.status(201).json(updateCountry);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.counties.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};