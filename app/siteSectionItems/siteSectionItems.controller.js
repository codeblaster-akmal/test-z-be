'use strict';

const db = require("../../config/db");

exports.list = async (req, res, next) => {
    try {
        const { attributes, sort = "id", order = "asc" } = req.query;
        let siteSectionItems = {}, args = { order: [[sort, order]] };

        if (attributes) args.attributes = attributes;

        const data = await db.site_section_items.findAll(args);
        siteSectionItems.data = data;
        res.status(200).json(siteSectionItems);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { siteSectionItems } = req.body;
        const newSiteSectionItem = await db.site_section_items.bulkCreate(siteSectionItems);
        res.status(201).json(newSiteSectionItem);
    } catch (err) {
        next(err);
    }
};

exports.siteSectionItemById = async (req, res, next) => {
    try {
        const siteSectionItem = await db.site_section_items.findByPk(req.params.id);
        res.status(200).json(siteSectionItem);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const siteSectionItem = req.body;
        const updateSiteSectionItem = await db.site_section_items.update(siteSectionItem, { where: { id: req.params.id } });
        res.status(200).json(updateSiteSectionItem);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.site_section_items.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};