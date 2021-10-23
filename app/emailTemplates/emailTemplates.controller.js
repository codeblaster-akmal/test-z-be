'use strict';

const db = require("../../config/db");

exports.list = async (request, response, next) => {
    try {
        let page, size, conditions, totalCount, emailTemplates = {};
        page = parseInt(request.query.page && request.query.page);
        size = parseInt(request.query.size && request.query.size);
        const { name, total_count } = request.query;
        const sort = request.query.sort ? request.query.sort : 'id';
        const order = request.query.order ? request.query.order : 'ASC';
        if (page > 0) {
            page = page * size;
        }

        const nameWhereConditions = { name: { [db.Sequelize.Op.like]: '%' + name + '%' } }

        conditions = { order: [[sort, order]] };

        if (total_count) {
            totalCount = await db.email_templates.count();
            emailTemplates.totalCount = totalCount;
        }

        if ((page || page == 0) && size) {
            conditions.offset = page
            conditions.limit = size
        }

        if (name) {
            conditions.where = nameWhereConditions;
        }
        const data = await db.email_templates.findAll(conditions);
        emailTemplates.data = data;
        response.status(200).json(emailTemplates);
    } catch (error) {
        next(error);
    }
};

exports.create = async (request, response, next) => {
    try {
        const emailTemplate = request.body;
        const newEmailTemplate = await db.email_templates.create(emailTemplate);
        response.status(201).json(newEmailTemplate);
    } catch (error) {
        next(error);
    }
};

exports.emailTemplateById = async (request, response, next) => {
    try {
        const emailTemplate = await db.email_templates.findByPk(request.params.id);
        response.status(200).json(emailTemplate);
    } catch (error) {
        next(error);
    }
};

exports.update = async (request, response, next) => {
    try {
        const emailTemplate = request.body;
        const updateEmailTemplate = await db.email_templates.update(emailTemplate, { where: { id: request.params.id } });
        response.status(200).json(updateEmailTemplate);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (request, response, next) => {
    try {
        await db.email_templates.destroy({ where: { id: request.params.id } });
        response.status(200).send({});
    } catch (error) {
        next(error);
    }
};