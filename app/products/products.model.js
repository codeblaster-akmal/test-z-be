"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
  class Product extends Model { }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Product already exists",
      },
      validate: {
        max: {
          args: 50,
          msg: "Maximum length upto 50",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    returnPolicy: {
      type: DataTypes.STRING,
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
    gender: {
      type: DataTypes.ENUM,
      values: ["MALE", "FEMALE", "BOTH", "NONE"],
      defaultValue: "NONE",
    },
    markup: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    lowStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    vat: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isReturn: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    isVariant: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    retailPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    costPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    sellPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    isMultipleListing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    liveRelatedProduct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    seoPageTitle: {
      type: DataTypes.STRING,
    },
    seoKeyword: {
      type: DataTypes.STRING,
    },
    seoConicals: {
      type: DataTypes.STRING,
    },
    seoMetaDescription: {
      type: DataTypes.TEXT,
    },
    folderName: {
      type: DataTypes.STRING,
    },
  },
    { sequelize, modelName: "product" }
  );
  return Product;
};
