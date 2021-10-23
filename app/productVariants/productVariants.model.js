'use strict';

module.exports = (sequelize, { Model }) => {
    class ProductVariant extends Model { }
    ProductVariant.init({
    }, { sequelize, modelName: 'product_variant' });
    return ProductVariant;
}