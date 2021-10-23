"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
  class OrderItems extends Model {}
  OrderItems.init(
    {
      itemQty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      itemPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    { sequelize, modelName: "order_item" }
  );
  return OrderItems;
};
