'use strict';

const config = require("../config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    underscored: true
  },
);

// Connect all the tables / models to the db object, 
// so that, everything is accessible via a single object.

const db = {};

// Sequelize instance
db.Sequelize = Sequelize;

// Sequelize connection instance
db.sequelize = sequelize;

// Models
db.sequences = require("../app/sequences/sequences.model")(sequelize, Sequelize);
db.customersProfileMst = require("../app/customersProfileMst/customersProfileMst.model")(sequelize, Sequelize);
db.categories = require("../app/categories/categories.model")(sequelize, Sequelize);
db.groups = require("../app/groups/groups.model")(sequelize, Sequelize);
db.sub_groups = require("../app/subGroups/subGroups.model")(sequelize, Sequelize);
db.brands = require("../app/brands/brands.model")(sequelize, Sequelize);
db.variants = require("../app/variants/variants.model")(sequelize, Sequelize);
db.attributes = require("../app/attributes/attributes.model")(sequelize, Sequelize);
db.uoms = require("../app/uoms/uoms.model")(sequelize, Sequelize);
db.configurations = require("../app/configurations/configurations.model")(sequelize, Sequelize);
db.email_templates = require("../app/emailTemplates/emailTemplates.model")(sequelize, Sequelize);
db.products = require("../app/products/products.model")(sequelize, Sequelize);
db.product_variants = require("../app/productVariants/productVariants.model")(sequelize, Sequelize);
db.product_variant_details = require("../app/productVariantDetails/productVariantDetails.model")(sequelize, Sequelize);
db.product_images = require("../app/productImages/productImages.model")(sequelize, Sequelize);
db.warehouses = require("../app/warehouses/warehouses.model")(sequelize, Sequelize);
db.type = require("../app/notifications/type/type.model")(sequelize, Sequelize);
db.subType = require("../app/notifications/subType/subType.model")(sequelize, Sequelize);
db.promotion_types = require('../app/promotionTypes/promotionTypes.model')(sequelize, Sequelize);
db.promotions = require('../app/promotions/promotions.model')(sequelize, Sequelize);
db.promotion_items = require('../app/promotionItems/promotionItems.model')(sequelize, Sequelize);
db.product_attribute_images = require('../app/productAttributeImages/productAttributeImages.model')(sequelize, Sequelize);
db.related_products = require('../app/relatedProducts/relatedProducts.model')(sequelize, Sequelize);
db.counties = require('../app/counties/counties.model')(sequelize, Sequelize);
db.cities = require('../app/cities/cities.model')(sequelize, Sequelize);
db.orders = require('../app/orders/orders.model')(sequelize, Sequelize);
db.order_items = require('../app/orderItems/orderItems.model')(sequelize, Sequelize);
db.customer_addresses = require('../app/customersAddresses/customerAddresses.model')(sequelize, Sequelize);
db.warehouse_stocks = require('../app/warehouseStocks/warehouseStocks.model')(sequelize, Sequelize);
db.carts = require('../app/carts/carts.model')(sequelize, Sequelize);
db.site_sections = require('../app/siteSections/siteSections.model')(sequelize, Sequelize);
db.site_section_items = require('../app/siteSectionItems/siteSectionItems.model')(sequelize, Sequelize);

// All association will go here...

// products-site_section_items
db.products.hasMany(db.site_section_items, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.site_section_items.belongsTo(db.products);

// site_sections-site_section_items
db.site_sections.hasMany(db.site_section_items, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.site_section_items.belongsTo(db.site_sections);

// customersProfileMst-carts
db.customersProfileMst.hasMany(db.carts, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.carts.belongsTo(db.customersProfileMst);

// products-carts
db.products.hasMany(db.carts, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.carts.belongsTo(db.products);

// product_variant_details-carts
db.product_variant_details.hasMany(db.carts, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.carts.belongsTo(db.product_variant_details);

// products-warehouse_stocks
db.products.hasMany(db.warehouse_stocks, { onDelete: 'cascade', hooks: true });
db.warehouse_stocks.belongsTo(db.products);

// product_variant_details-warehouse_stocks
db.product_variant_details.hasMany(db.warehouse_stocks, { onDelete: 'cascade', hooks: true });
db.warehouse_stocks.belongsTo(db.product_variant_details);

// warehouses-warehouse_stocks
db.warehouses.hasMany(db.warehouse_stocks, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.warehouse_stocks.belongsTo(db.warehouses);

// cities-warehouses
db.cities.hasMany(db.warehouses, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.warehouses.belongsTo(db.cities);

// counties-cities
db.counties.hasMany(db.cities, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.cities.belongsTo(db.counties);

// products-related_products
db.products.hasMany(db.related_products, { onDelete: 'cascade', hooks: true });
db.related_products.belongsTo(db.products);

// products-product_variant_details
db.products.hasMany(db.product_variant_details, { onDelete: 'cascade', hooks: true });
db.product_variant_details.belongsTo(db.products);

// products-product_attribute_images
db.products.hasMany(db.product_attribute_images, { onDelete: 'cascade', hooks: true });
db.product_attribute_images.belongsTo(db.products);

// product_variants-product_attribute_images
db.product_variants.hasMany(db.product_attribute_images, { onDelete: 'cascade', hooks: true });
db.product_attribute_images.belongsTo(db.product_variants);

// products-product_variants
db.products.hasMany(db.product_variants, { onDelete: 'cascade', hooks: true });
db.product_variants.belongsTo(db.products);

// variants-product_variants
db.variants.hasMany(db.product_variants, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT', hooks: true });
db.product_variants.belongsTo(db.variants);

// attributes-product_variants
db.attributes.hasMany(db.product_variants, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT', hooks: true });
db.product_variants.belongsTo(db.attributes);

// products-product_images
db.products.hasMany(db.product_images, { onDelete: 'cascade', hooks: true });
db.product_images.belongsTo(db.products);

// uoms-attributes
db.uoms.hasOne(db.attributes, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.attributes.belongsTo(db.uoms);

// Association with Categories and groups
db.categories.hasMany(db.groups, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.groups.belongsTo(db.categories);

// Association with Group and sub-Group
db.groups.hasMany(db.sub_groups, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.sub_groups.belongsTo(db.groups);

// Association with sub_groups with variants
db.sub_groups.hasMany(db.variants, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.variants.belongsTo(db.sub_groups);

// Association with Product variants attributes with Product variants
db.variants.hasMany(db.attributes, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.attributes.belongsTo(db.variants);

// Association with Products and sub_group
db.sub_groups.hasMany(db.products, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.products.belongsTo(db.sub_groups);

// Association with Products and brand
db.brands.hasMany(db.products, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.products.belongsTo(db.brands);

// Association with notification type and notification sub-type
db.type.hasMany(db.subType, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.subType.belongsTo(db.type);

// Association with products-promotion_items
db.products.hasMany(db.promotion_items, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.promotion_items.belongsTo(db.products);

// Association with categories-promotion_items
db.categories.hasMany(db.promotion_items, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.promotion_items.belongsTo(db.categories);

// Association with brands-promotion_items
db.brands.hasMany(db.promotion_items, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.promotion_items.belongsTo(db.brands);

// Association with promotions-promotion_items
db.promotions.hasMany(db.promotion_items, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.promotion_items.belongsTo(db.promotions);

// Association with promotion_types-promotions
db.promotion_types.hasMany(db.promotions, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.promotions.belongsTo(db.promotion_types);

// Association with orders-promotions
// Multiple orders for multiple promotions
db.promotions.hasMany(db.orders, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.orders.belongsTo(db.promotions);

// Association with orders-customers
// Multiple orders for multiple promotions
db.customersProfileMst.hasMany(db.orders, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.orders.belongsTo(db.customersProfileMst);

// Association with orders-orderItems
db.orders.hasMany(db.order_items, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.order_items.belongsTo(db.orders);

// Association with ordersItems-product
db.products.hasMany(db.order_items, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.order_items.belongsTo(db.products);

// Association with ordersItems-product
db.product_variant_details.hasMany(db.order_items, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.order_items.belongsTo(db.product_variant_details);

// addresses-city
db.cities.hasMany(db.customer_addresses, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.customer_addresses.belongsTo(db.cities);

// addresses-customer
db.customersProfileMst.hasMany(db.customer_addresses, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.customer_addresses.belongsTo(db.customersProfileMst);

module.exports = db;