"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
  class ProductVariantDetail extends Model { }
  ProductVariantDetail.init({
    combinationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    markup: {
      type: DataTypes.FLOAT
    },
    retailPrice: {
      type: DataTypes.FLOAT
    },
    costPrice: {
      type: DataTypes.FLOAT
    },
    sellPrice: {
      type: DataTypes.FLOAT
    },
    sku: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "SKU already exists",
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
    { sequelize, modelName: "product_variant_detail" }
  );
  return ProductVariantDetail;
};
