"use strict";

const db = require("../../config/db");
const { SCHEMA } = require("../../utils/dbUtils/schema");
const { upload } = require("../../utils/fileUpload/multer");
const { CONSTANTS } = require("../../utils/constants");
const imageUpload = upload.array("productImages");
const { sequenceGenerator, updateSequence } = require("../../utils/dbUtils/sequenceGenerator");
const { createProductImages, checkIsReqFiles, rmvFileOnError, findNrmvExistPrdImages, createWarehouseStock, fetchRelatedProducts, updateProductVariantDetails } = require("./products.utils");

exports.list = async (req, res, next) => {
  try {
    const {
      attributes,
      sort = "id",
      order = "asc",
      brands,
      brands_attr,
      sub_groups,
      sub_groups_attr,
      sub_groups_groups,
      sub_groups_groups_attr,
      sub_groups_groups_categories,
      sub_groups_groups_categories_attr,
      product_images,
      product_images_attr,
      is_default_img_only,
      product_variant_details,
      product_variant_details_attr,
      product_variants,
      product_variants_attr,
      product_variants_attributes,
      product_variants_attributes_attr,
    } = req.query;

    let products = {},
      args = { order: [[sort, order]] },
      includes = [],
      subGroupIncludes = [],
      groupIncludes = [],
      productVariantIncludes = [];

    const groupSchema = {
      ...SCHEMA.GROUP,
      attributes: sub_groups_groups_attr
    };

    const subGroupSchema = {
      ...SCHEMA.SUBGROUP,
      attributes: sub_groups_attr
    };

    const productImageSchema = {
      ...SCHEMA.PRODUCT_IMAGE,
      attributes: product_images_attr
    };

    const productVariantSchema = {
      ...SCHEMA.PRODUCTS_VARIANT,
      attributes: product_variants_attr
    };

    if (attributes) args.attributes = attributes;

    if (sub_groups_groups_categories) {
      groupIncludes.push({
        ...SCHEMA.CATEGORY,
        attributes: sub_groups_groups_categories_attr
      });
    }

    if (groupIncludes.length) groupSchema.include = groupIncludes;

    if (sub_groups_groups) {
      subGroupIncludes.push(groupSchema);
    }

    if (subGroupIncludes.length) subGroupSchema.include = subGroupIncludes;

    if (sub_groups) {
      includes.push(subGroupSchema);
    }

    if (brands) {
      includes.push({
        ...SCHEMA.BRAND,
        attributes: brands_attr
      });
    }

    if (is_default_img_only) {
      productImageSchema.where = { isDefault: true };
      productImageSchema.required = false;
    }

    if (product_images) {
      includes.push(productImageSchema);
    }

    if (product_variant_details) {
      includes.push({
        ...SCHEMA.PRODUCTS_VARIANT_DETAIL,
        attributes: product_variant_details_attr
      });
    }

    if (product_variants_attributes) {
      productVariantIncludes.push({
        ...SCHEMA.ATTRIBUTE,
        attributes: product_variants_attributes_attr
      });
    }

    if (productVariantIncludes.length) {
      productVariantSchema.include = productVariantIncludes;
    }

    if (product_variants) {
      includes.push(productVariantSchema);
    }

    if (includes.length) args.include = includes;

    const data = await db.products.findAll(args);
    products.data = data;
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { uniqueId, startValue, seqId } = await sequenceGenerator(CONSTANTS.PRODUCT_IMAGES_SEQ_GEN);
    req.params.paramsId = uniqueId;
    imageUpload(req, res, async (error) => {
      if (error) {
        res.status(400).json({
          error: CONSTANTS.MAXIMUM_PRODUCT_IMAGES_ERROR_MESSAGE,
        });
      } else {
        const product = req.body;

        let response = {};

        product.sku = product.sku === "null" ? null : product.sku;
        product.folderName = uniqueId;

        const newProduct = await db.products.create(product);
        response.product = newProduct;

        response.productImages = await createProductImages(newProduct.id, product, req.files);

        if (product.warehouseStock) {
          response.warehouseStock = await createWarehouseStock(newProduct.id, product.warehouseStock);
        }

        await updateSequence(seqId, { startValue: startValue + 1 });

        res.status(201).json(response);
      }
    });
  } catch (error) {
    if (checkIsReqFiles(req.files)) await rmvFileOnError(req.files);
    next(error);
  }
};

exports.productById = async (req, res, next) => {
  try {
    const {
      attributes,
      brands,
      brands_attr,
      product_images,
      product_images_attr,
      is_default_img_only,
      product_variants,
      product_variants_attr,
      product_variant_details,
      product_variant_details_attr,
      product_variants_attributes,
      product_variants_attributes_attr,
      product_variants_variants,
      product_variants_variants_attr,
      product_variants_product_attribute_images,
      product_variants_product_attribute_images_attr,
      with_related_products,
      warehouse_stocks_attr,
      warehouse_stocks,
      sub_groups,
      sub_groups_attr,
      sub_groups_groups,
      sub_groups_groups_attr,
      sub_groups_groups_categories,
      sub_groups_groups_categories_attr,
    } = req.query;

    const { id } = req.params;

    let product = {},
      args = { where: { id } },
      includes = [],
      productVariantIncludes = [],
      subGroupIncludes = [],
      groupIncludes = [];

    const groupSchema = {
      ...SCHEMA.GROUP,
      attributes: sub_groups_groups_attr
    };

    const subGroupSchema = {
      ...SCHEMA.SUBGROUP,
      attributes: sub_groups_attr
    };

    const productImageSchema = {
      ...SCHEMA.PRODUCT_IMAGE,
      attributes: product_images_attr
    };

    const warehouseStockSchema = {
      ...SCHEMA.WAREHOUSE_STOCKS,
      attributes: warehouse_stocks_attr
    };

    const productVariantSchema = {
      ...SCHEMA.PRODUCTS_VARIANT,
      attributes: product_variants_attr
    };

    if (attributes) args.attributes = attributes;

    if (brands) {
      includes.push({
        ...SCHEMA.BRAND,
        attributes: brands_attr
      });
    }

    if (is_default_img_only) {
      productImageSchema.where = { isDefault: true };
      productImageSchema.required = false;
    }

    if (product_images) {
      includes.push(productImageSchema);
    }

    if (warehouse_stocks) {
      includes.push(warehouseStockSchema);
    }

    if (product_variants_product_attribute_images) {
      productVariantIncludes.push({
        ...SCHEMA.PRODUCT_ATTRIBUTE_IMAGE,
        attributes: product_variants_product_attribute_images_attr
      });
    }

    if (product_variants_attributes) {
      productVariantIncludes.push({
        ...SCHEMA.ATTRIBUTE,
        attributes: product_variants_attributes_attr
      });
    }

    if (product_variants_variants) {
      productVariantIncludes.push({
        ...SCHEMA.VARIANT,
        attributes: product_variants_variants_attr
      });
    }

    if (productVariantIncludes.length) {
      productVariantSchema.include = productVariantIncludes;
    }

    if (product_variants) {
      includes.push(productVariantSchema);
    }

    if (product_variant_details) {
      includes.push({
        ...SCHEMA.PRODUCTS_VARIANT_DETAIL,
        attributes: product_variant_details_attr
      });
    }
    
    if (sub_groups_groups_categories) {
      groupIncludes.push({
        ...SCHEMA.CATEGORY,
        attributes: sub_groups_groups_categories_attr
      });
    }

    if (groupIncludes.length) groupSchema.include = groupIncludes;

    if (sub_groups_groups) {
      subGroupIncludes.push(groupSchema);
    }

    if (subGroupIncludes.length) subGroupSchema.include = subGroupIncludes;

    if (sub_groups) {
      includes.push(subGroupSchema);
    }

    if (with_related_products) {
      product.relatedProducts = await fetchRelatedProducts(id);
    }

    if (includes.length) args.include = includes;

    const data = await db.products.findOne(args);
    product.data = data;
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { update_prd_vat_det_vat } = req.query;
    const { id } = req.params;
    const getProduct = await db.products.findByPk(id);
    req.params.paramsId = getProduct.folderName;
    imageUpload(req, res, async (error) => {
      if (error) {
        res.status(400).json({
          error: CONSTANTS.MAXIMUM_PRODUCT_IMAGES_ERROR_MESSAGE,
        });
      } else {
        const product = req.body;
        let response = { product };

        product.sku = product.sku === "null" ? null : product.sku;
        await db.products.update(product, { where: { id } });

        if (update_prd_vat_det_vat) {
          await updateProductVariantDetails(product.vat, id);
        }

        await findNrmvExistPrdImages(id);

        response.productImages = await createProductImages(id, product, req.files);

        if (update_prd_vat_det_vat) {
          response.productVariantDetails = await db.product_variant_details.findAll({ where: { productId: id } });
        }

        res.status(200).json(response);
      }
    });
  } catch (error) {
    if (checkIsReqFiles(req.files)) await rmvFileOnError(req.files);
    next(error);
  }
};

exports.updateJsonData = async (req, res, next) => {
  try {
    const { on_status } = req.query;
    const { id } = req.params;
    const product = req.body;
    let response = { product };
    await db.products.update(product, { where: { id } });
    if (on_status) {
      await db.product_variant_details.update(product, { where: { productId: id } });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await db.products.destroy({ where: { id } });
    if (product > 0) {
      await findNrmvExistPrdImages(id);
    }
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};