'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class RelatedProduct extends Model { }
    RelatedProduct.init({
        actualProductId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { sequelize, modelName: 'related_product' });
    return RelatedProduct;
}