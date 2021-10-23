'use strict';

const db = require("../../config/db");

exports.list = async (req, res, next) => {
    try {
        const sequences = await db.sequences.findAll();
        res.status(200).json(sequences);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const sequence = req.body;
        const newSequence = await db.sequences.create(sequence);
        res.status(201).json(newSequence);
    } catch (error) {
        next(error);
    }
};

exports.sequenceById = async (req, res, next) => {
    try {
        const sequence = await db.sequences.findByPk(req.params.id);
        res.status(200).json(sequence);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const sequence = req.body;
        const updateSequence = await db.sequences.update(sequence, { where: { id: req.params.id } });
        res.status(200).json(updateSequence);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.sequences.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (error) {
        next(error);
    }
};