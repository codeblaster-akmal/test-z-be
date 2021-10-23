"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class ProductAttributeImage extends Model { }
    ProductAttributeImage.init({
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
        isPrimary: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
    },
        { sequelize, modelName: "product_attribute_image" }
    );
    return ProductAttributeImage;
};
