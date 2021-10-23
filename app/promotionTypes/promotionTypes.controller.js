'use strict';

const db = require("../../config/db");

exports.list = async (req, res, next) => {
    try {
        const { attributes, sort = "id", order = "asc" } = req.query;
        let promotionTypes = {}, args = { order: [[sort, order]] };

        if (attributes) args.attributes = attributes;

        const data = await db.promotion_types.findAll(args);
        promotionTypes.data = data;
        res.status(200).json(promotionTypes);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const promotionType = req.body;
        const newPromotionType = await db.promotion_types.create(promotionType);
        res.status(201).json(newPromotionType);
    } catch (err) {
        next(err);
    }
};

exports.promotionTypeById = async (req, res, next) => {
    try {
        const promotionType = await db.promotion_types.findByPk(req.params.id);
        res.status(200).json(promotionType);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const promotionType = req.body;
        const updatePromotionType = await db.promotion_types.update(promotionType, { where: { id: req.params.id } });
        res.status(200).json(updatePromotionType);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.promotion_types.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};