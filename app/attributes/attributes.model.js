"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
  class Attribute extends Model { }
  Attribute.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 30],
          msg: "Maximum length upto 30",
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  },
    { sequelize, modelName: "attribute" }
  );
  return Attribute;
};
