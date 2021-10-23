'use strict';
const fs = require("fs");
const db = require("../../config/db");

exports.list = async (req, res, next) => {
    try {
        const { attributes, sort = "id", order = "asc" } = req.query;
        let productAttributeImages = {}, args = { order: [[sort, order]] };

        if (attributes) args.attributes = attributes;

        const data = await db.product_attribute_images.findAll(args);
        productAttributeImages.data = data;
        res.status(200).json(productAttributeImages);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (request, response, next) => {
    try {
        const productImages = await db.product_attribute_images.findByPk(request.params.id);
        await fs.unlink(productImages.image, (error) => {
            if (error) throw error;
        })
        await db.product_attribute_images.destroy({ where: { id: request.params.id } });
        response.status(200).send({});
    } catch (error) {
        next(error);
    }
};