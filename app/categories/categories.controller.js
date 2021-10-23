"use strict";

const db = require("../../config/db");
const { CONSTANTS } = require("../../utils/constants");
const { SCHEMA } = require("../../utils/dbUtils/schema");
const { delFile } = require("../../utils/fileSystem");
const { upload } = require("../../utils/fileUpload/multer");
const { checkIsReqFiles, rmvFileOnError } = require("../products/products.utils");
const imageUpload = upload.array("categoryImage", CONSTANTS.MAXIMUM_CATEGORY_IMAGES);

exports.list = async (req, res, next) => {
  try {
    const {
      attributes,
      sort = "id",
      order = "asc",
      groups,
      groups_attr,
      groups_sub_groups,
      groups_sub_groups_attr,
      groups_sub_groups_products,
      groups_sub_groups_products_attr,
      top_saling_brands
    } = req.query;

    let categories = {},
      args = { order: [[sort, order]] },
      includes = [],
      groupIncludes = [],
      subGroupIncludes = [];

    const groupSchema = {
      ...SCHEMA.GROUP,
      attributes: groups_attr
    };

    const subGroupSchema = {
      ...SCHEMA.SUBGROUP,
      attributes: groups_sub_groups_attr
    };

    if (attributes) args.attributes = attributes;

    if (groups_sub_groups_products) {
      subGroupIncludes.push({
        ...SCHEMA.PRODUCT,
        attributes: groups_sub_groups_products_attr
      });
    }

    if (subGroupIncludes.length) subGroupSchema.include = subGroupIncludes;

    if (groups_sub_groups) groupIncludes.push(subGroupSchema);

    if (groupIncludes.length) groupSchema.include = groupIncludes;

    if (groups) {
      includes.push(groupSchema);
    }

    /* Top Saling  Brands */
    if (top_saling_brands) {
      args = {
        attributes: {
          include: [
            [
              db.Sequelize.fn("COUNT", db.Sequelize.col("groups.id")),
              "saleCount",
            ],
          ],
        },
        group: ["category.id"],
      };
      includes.push({
        ...SCHEMA.GROUP,
        attributes: [],
      });
    }

    if (includes.length) args.include = includes;

    const data = await db.categories.findAll(args);
    categories.data = data;
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (await checkMenuPriority(req.query.menu_priority)) {
      res.status(400).json({ error: "Invalid menu priority." });
    } else {
      imageUpload(req, res, async (error) => {
        if (error) {
          res.status(400).json({
            error: CONSTANTS.SINGLE_IMAGE_ERROR_MESSAGE("category"),
          });
        } else {
          const [image, banner] = req.files;

          const category = req.body;

          const newCategory = await db.categories.create({
            ...category,
            image: image.path,
            banner: !banner ? CONSTANTS.CATEGORY_DEFAULT_IMAGE : banner.path,
          });

          res.status(201).json(newCategory);
        }
      });
    }
  } catch (error) {
    if (checkIsReqFiles(req.files)) await rmvFileOnError(req.files);
    next(error);
  }
};

exports.categoryById = async (req, res, next) => {
  try {
    const {
      attributes,
      groups,
      groups_attr,
      groups_sub_groups,
      groups_sub_groups_attr,
      groups_sub_groups_products,
      groups_sub_groups_products_attr
    } = req.query;

    const { id } = req.params

    let category = {},
      args = { where: { id } },
      includes = [],
      groupIncludes = [],
      subGroupIncludes = [];

    const groupSchema = {
      ...SCHEMA.GROUP,
      attributes: groups_attr
    };

    const subGroupSchema = {
      ...SCHEMA.SUBGROUP,
      attributes: groups_sub_groups_attr
    };

    if (attributes) args.attributes = attributes;

    if (groups_sub_groups_products) {
      subGroupIncludes.push({
        ...SCHEMA.PRODUCT,
        attributes: groups_sub_groups_products_attr
      });
    }

    if (subGroupIncludes.length) subGroupSchema.include = subGroupIncludes;

    if (groups_sub_groups) {
      groupIncludes.push(subGroupSchema);
    }

    if (groupIncludes.length) groupSchema.include = groupIncludes;

    if (groups) {
      includes.push(groupSchema);
    }

    if (includes.length) args.include = includes;

    const data = await db.categories.findOne(args);
    category.data = data;
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (
      (await checkMenuPriority(req.query.menu_priority)) &&
      req.query.menu_priority !== undefined
    ) {
      res.status(400).json({ error: "Invalid menu priority." });
    } else {
      imageUpload(req, res, async (error) => {
        if (error) {
          res.status(400).json({
            error: CONSTANTS.SINGLE_IMAGE_ERROR_MESSAGE("category"),
          });
        } else {
          const [image, banner] = req.files;
          const categoryData = req.body;

          let newCategory;
          if (!image && !banner) {
            newCategory = await db.categories.update(categoryData, {
              where: { id: req.params.id },
            });
            res.status(200).json(newCategory);
          } else {
            let flag = req.files.length === 2 ? true : false;
            let updateObj = { ...categoryData };
            const category = await db.categories.findByPk(req.params.id);
            if (flag) {
              if (banner) {
                if (category.banner !== CONSTANTS.CATEGORY_DEFAULT_IMAGE) {
                  delFile(category.banner);
                }
                updateObj.banner = banner.path;
              }
              if (image) {
                if (category.image !== CONSTANTS.CATEGORY_DEFAULT_IMAGE) {
                  delFile(category.image);
                }
                updateObj.image = image.path;
              }
            } else {
              let keyName = categoryData.isBanner ? "banner" : "image"
              if (category[keyName] !== CONSTANTS.CATEGORY_DEFAULT_IMAGE) {
                delFile(category[keyName]);
              }
              updateObj[keyName] = image.path;
            }
            newCategory = await db.categories.update(updateObj, { where: { id: req.params.id } });
            res.status(200).json(updateObj);
          }
        }
      });
    }
  } catch (error) {
    if (checkIsReqFiles(req.files)) await rmvFileOnError(req.files);
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await db.categories.destroy({ where: { id: req.params.id } });
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};

// comments
const checkMenuPriority = async (value) => {
  const categories = await db.categories.findAll({
    order: [["menuPriority", "DESC"]],
  });
  if (!categories || !categories.length) {
    return false;
  } else {
    if (categories[0].menuPriority + 1 >= value) {
      return false;
    } else {
      return true;
    }
  }
};