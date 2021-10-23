'use strict';

const db = require("../../config/db");

exports.list = async (req, res, next) => {
    try {
        const { attributes, sort = "id", order = "asc" } = req.query;
        let promotionItems = {}, args = { order: [[sort, order]] };

        if (attributes) args.attributes = attributes;

        const data = await db.promotion_items.findAll(args);
        promotionItems.data = data;
        res.status(200).json(promotionItems);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const promotionItem = req.body;
        const newPromotionItem = await db.promotion_items.create(promotionItem);
        res.status(201).json(newPromotionItem);
    } catch (err) {
        next(err);
    }
};

exports.promotionItemById = async (req, res, next) => {
    try {
        const promotionItem = await db.promotion_items.findByPk(req.params.id);
        res.status(200).json(promotionItem);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const promotionItem = req.body;
        const updatePromotionItem = await db.promotion_items.update(promotionItem, { where: { id: req.params.id } });
        res.status(200).json(updatePromotionItem);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.promotion_items.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};