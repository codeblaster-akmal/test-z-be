'use strict';

const db = require("../../config/db");

exports.SCHEMA = {
    CUSTOMER: {
        model: db.customersProfileMst
    },
    CATEGORY: {
        model: db.categories,
    },
    GROUP: {
        model: db.groups,
    },
    SUBGROUP: {
        model: db.sub_groups,
    },
    BRAND: {
        model: db.brands,
    },
    VARIANT: {
        model: db.variants,
    },
    ATTRIBUTE: {
        model: db.attributes,
    },
    UOM: {
        model: db.uoms,
    },
    PRODUCT: {
        model: db.products,
    },
    PRODUCTS_VARIANT: {
        model: db.product_variants,
    },
    PRODUCTS_VARIANT_DETAIL: {
        model: db.product_variant_details,
    },
    PRODUCTS_STOCK: {
        model: db.product_stock,
    },
    PRODUCT_IMAGE: {
        model: db.product_images,
    },
    CITY: {
        model: db.cities
    },
    COUNTY: {
        model: db.counties
    },
    CUSTOMER_ADDRESSES: {
        model: db.customer_addresses
    },
    PRODUCT_ATTRIBUTE_IMAGE: {
        model: db.product_attribute_images
    },
    SITE_SECTION_ITEMS: {
        model: db.site_section_items
    },
    WAREHOUSE_STOCKS: {
        model: db.warehouse_stocks
    }
};