const { SEED } = require("./seed");

module.exports = async (db) => {
    await db.sequences.bulkCreate(SEED.SEQUENCE);
    await db.promotion_types.bulkCreate(SEED.PROMOTION_TYPE);
    await db.uoms.bulkCreate(SEED.UOM);
    await db.counties.bulkCreate(SEED.COUNTY);
    await db.cities.bulkCreate(SEED.CITY);
    await db.customersProfileMst.bulkCreate(SEED.CUSTOMER);
    await db.categories.bulkCreate(SEED.CATEGORY);
    await db.groups.bulkCreate(SEED.GROUP);
    await db.sub_groups.bulkCreate(SEED.SUBGROUP);
    await db.brands.bulkCreate(SEED.BRAND);
    await db.configurations.bulkCreate(SEED.CONFIGURATION);
    await db.email_templates.bulkCreate(SEED.EMAIL_TEMPLATE);
    await db.customer_addresses.bulkCreate(SEED.CUSTOMER_ADDRESS);
    await db.variants.bulkCreate(SEED.VARIANT);
    await db.attributes.bulkCreate(SEED.ATTRIBUTE);
    await db.products.bulkCreate(SEED.PRODUCT);
    await db.product_variants.bulkCreate(SEED.PRODUCT_VARIANT);
    await db.product_images.bulkCreate(SEED.PRODUCT_IMAGE);
    await db.product_variant_details.bulkCreate(SEED.PRODUCT_VARIANT_DETAIL);
    await db.product_attribute_images.bulkCreate(SEED.PRODUCT_ATTRIBUTE_IMAGE);
    await db.site_sections.bulkCreate(SEED.SITE_SECTION);
    await db.site_section_items.bulkCreate(SEED.SITE_SECTION_ITEM);
    await db.warehouses.bulkCreate(SEED.WAREHOUSE);
    await db.warehouse_stocks.bulkCreate(SEED.WAREHOUSE_STOCK);
};