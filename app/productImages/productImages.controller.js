'use strict';

const db = require("../../config/db");
const { delFile } = require("../../utils/fileSystem");

exports.list = async (req, res, next) => {
    try {
        const { attributes, sort = "id", order = "asc" } = req.query;
        let productImages = {}, args = { order: [[sort, order]] };

        if (attributes) args.attributes = attributes;

        const data = await db.product_images.findAll(args);
        productImages.data = data;
        res.status(200).json(productImages);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (request, response, next) => {
    try {
        const { id } = request.params;
        const productImage = await db.product_images.findByPk(id);
        delFile(productImage.image);
        await db.product_images.destroy({ where: { id } });
        response.status(200).send({});
    } catch (error) {
        next(error);
    }
};