"use strict";

const db = require("../../config/db");
const { CONSTANTS } = require("../../utils/constants");
const { delFile } = require("../../utils/fileSystem");
const { upload } = require("../../utils/fileUpload/multer");
const imageUpload = upload.single("brandImage");
const { SCHEMA } = require("../../utils/dbUtils/schema");

exports.list = async (req, res, next) => {
  try {
    const {
      attributes,
      sort = "id",
      order = "asc",
      with_prod_count,
      top_saling_brands,
      size,
    } = req.query;

    let page = req.query.page;

    let brands = {},
      args = { order: [[sort, order]] },
      includes = [];

    if (attributes) args.attributes = attributes;

    if (page > 0) {
      page = +page * +size;
    }

    if (with_prod_count) {
      args = {
        attributes: {
          include: [
            [
              db.Sequelize.fn("COUNT", db.Sequelize.col("products.id")),
              "productCount",
            ],
          ],
        },
        group: ["brand.id"],
      };
      includes.push({
        ...SCHEMA.PRODUCT,
        attributes: [],
      });
    }

    if (top_saling_brands) {
      args = {
        attributes: {
          include: [
            [
              db.Sequelize.fn("COUNT", db.Sequelize.col("products.id")),
              "saleCount",
            ],
          ],
        },
        group: ["brand.id"],
      };
      includes.push({
        ...SCHEMA.PRODUCT,
        attributes: [],
      });
    }

    if (includes.length) args.include = includes;

    if ((page || page == 0) && size) {
      args.offset = +page;
      args.limit = +size;
    }

    const data = await db.brands.findAll(args);
    brands.data = data;
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  imageUpload(req, res, async (error) => {
    if (error) {
      res.status(400).json({
        error: CONSTANTS.SINGLE_IMAGE_ERROR_MESSAGE("brand"),
      });
    } else {
      try {
        const brand = req.body;
        const data = !req.file
          ? { ...brand, image: CONSTANTS.BRAND_DEFAULT_IMAGE }
          : { ...brand, image: req.file.path };
        const newBrand = await db.brands.create(data);
        res.status(201).json(newBrand);
      } catch (error) {
        if (req && req.file && req.file.path) delFile(req.file.path);
        next(error);
      }
    }
  });
};

exports.brandById = async (req, res, next) => {
  try {
    const brand = await db.brands.findByPk(req.params.id);
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  imageUpload(req, res, async (error) => {
    if (error) {
      res.status(400).json({
        error: CONSTANTS.SINGLE_IMAGE_ERROR_MESSAGE("brand"),
      });
    } else {
      try {
        const { id } = req.params;
        const brand = req.body;

        if (req.file) {
          const getBrand = await db.brands.findByPk(id);

          if (getBrand.image !== CONSTANTS.BRAND_DEFAULT_IMAGE) {
            delFile(getBrand.image);
          }
        }

        const data = !req.file ? brand : { ...brand, image: req.file.path };
        await db.brands.update(data, { where: { id } });
        res.status(201).json(data);
      } catch (err) {
        if (req && req.file && req.file.path) delFile(req.file.path);
        next(err);
      }
    }
  });
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await db.brands.findByPk(id);
    const brandDelete = await db.brands.destroy({ where: { id } });
    if (brandDelete > 0) delFile(brand.image);
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};
