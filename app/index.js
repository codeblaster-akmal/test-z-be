'use strict';

const routes = [
    require("./status"),
    require("./sequences/sequences.routes"),
    require("./auth/auth.routes"),
    require("./customersProfileMst/customersProfileMst.routes"),
    require("./categories/categories.routes"),
    require("./groups/groups.routes"),
    require("./subGroups/subGroups.routes"),
    require("./brands/brands.routes"),
    require("./variants/variants.routes"),
    require("./attributes/attributes.routes"),
    require("./uoms/uoms.routes"),
    require("./configurations/configurations.routes"),
    require("./emailTemplates/emailTemplates.routes"),
    require("./products/products.routes"),
    require("./productVariants/productVariants.routes"),
    require("./productVariantDetails/productVariantDetails.routes"),
    require("./productImages/productImages.routes"),
    require("./warehouses/warehouses.routes"),
    require("./notifications/type/type.routes"),
    require("./notifications/subType/subType.routes"),
    require("./promotionTypes/promotionTypes.routes"),
    require("./promotions/promotions.routes"),
    require("./promotionItems/promotionItems.routes"),
    require("./productAttributeImages/productAttributeImages.routes"),
    require("./relatedProducts/relatedProducts.routes"),
    require("./counties/counties.routes"),
    require("./cities/cities.routes"),
    require("./orders/orders.routes"),
    require("./orderItems/orderItems.routes"),
    require("./customersAddresses/customerAddresses.routes"),
    require("./warehouseStocks/warehouseStocks.routes"),
    require("./carts/carts.routes"),
    require("./siteSections/siteSections.routes"),
    require("./siteSectionItems/siteSectionItems.routes")
];


// Add access to the app and db objects to each route
module.exports = function router(app, db) {
    return routes.forEach((route) => {
        route(app, db);
    });
};
