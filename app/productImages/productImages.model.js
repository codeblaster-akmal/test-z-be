"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class ProductImage extends Model { }
    ProductImage.init({
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: 200,
                    msg: 'Maximum image url length upto 200'
                },
            },
        },
        originalName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: 200,
                    msg: 'Maximum image name length upto 200'
                },
            },
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
    },
        { sequelize, modelName: "product_image" }
    );
    return ProductImage;
};
