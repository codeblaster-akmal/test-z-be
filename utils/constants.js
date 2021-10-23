'use strict';
require("dotenv").config();

exports.CONSTANTS = {
    CATEGORY_DEFAULT_IMAGE: 'public/images/categories/default_category.png',
    SINGLE_IMAGE_ERROR_MESSAGE(name) {
        return `Maximum ${name} image is 1`
    },
    DATA_LENGTH_ERROR_MESSAGE(args, min, max) {
        return `${args} length between ${min} to ${max}`
    },
    INVALID_ERROR_MESSAGE(args) {
        return `Invalid ${args}`
    },
    CUSTOMER_NUMBER_SEQ_GEN: 'customer',
    PRODUCT_SKU_SEQ_GEN: 'PRODUCT_SKU',
    BRAND_DEFAULT_IMAGE: 'public/images/brands/default_brand.png',
    GROUP_DEFAULT_IMAGE: 'public/images/groups/default_group.png',
    DEFAULT_IMAGE_PATH: 'public/images/',
    DEFAULT_HOST: `${process.env.DATABASE_HOST}:${process.env.PORT}`,
    ORDER_BY_ASCENDING: 'ASC',
    PRODUCT_IMAGES_SEQ_GEN: 'products',
    ORDER_SEQ_GEN: 'order',
    MAXIMUM_PRODUCT_IMAGES_ERROR_MESSAGE: `Maximum product image limit reached.`,
    MAXIMUM_PRODUCT_VARIANT_ATTRIBUTES_ERROR_MESSAGE: `Maximum product variant attribute image limit reached.`,
    PRODUCT_VARIANT_IMAGES_SEQ_GEN: 'variants',
    MAXIMUM_PRODUCT_VARIANT_IMAGES: 4,
    MAXIMUM_BANNER_IMAGES: 4,
    MAXIMUM_BANNER_IMAGES_ERROR_MESSAGE: `Maximum banner image is ${this.MAXIMUM_BANNER_IMAGES}`,
    MAXIMUM_CATEGORY_IMAGES: 2
};