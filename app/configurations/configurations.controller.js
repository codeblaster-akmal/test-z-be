'use strict';

const db = require("../../config/db");

exports.list = async (request, response, next) => {
    try {
        let conditions = {};
        const { search } = request.query;

        const keyWhereConditions = { key: { [db.Sequelize.Op.like]: '%' + search + '%' } };

        if (search) {
            conditions.where = keyWhereConditions;
            conditions.required = false;
        }
        const configurations = await db.configurations.findAll(conditions);
        response.status(200).json(configurations);
    } catch (error) {
        next(error);
    }
};

exports.create = async (request, response, next) => {
    try {
        const configuration = request.body;
        if (configuration && configuration.length > 0) {
            configuration.forEach(async (config) => {
                await db.configurations.update({ value: config[Object.keys(config)[0]] }, { where: { key: Object.keys(config)[0] } });
            })
        }
        response.status(201).json(configuration);
    } catch (error) {
        next(error);
    }
};

exports.configurationById = async (request, response, next) => {
    try {
        const configuration = await db.configurations.findByPk(request.params.id);
        response.status(200).json(configuration);
    } catch (error) {
        next(error);
    }
};

exports.update = async (request, response, next) => {
    try {
        const configuration = request.body;
        const updateConfiguration = await db.configurations.update(configuration, { where: { id: request.params.id } });
        response.status(200).json(updateConfiguration);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (request, response, next) => {
    try {
        await db.configurations.destroy({ where: { id: request.params.id } });
        response.status(200).send({});
    } catch (error) {
        next(error);
    }
};