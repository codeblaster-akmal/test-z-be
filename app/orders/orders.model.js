"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
  class Order extends Model {}
  Order.init(
    {
      orderNumber: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Order number is already exist",
        },
      },
      totalQty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      paymentMethod: {
        type: DataTypes.ENUM,
        values: ["CARD", "COD", "NETBANCKING","PAYPAL", "NONE"],
        defaultValue: "NONE",
      },
      discount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      shippingCharge: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      otherFee: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      subTotal: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      grandTotal: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
    },
    { sequelize, modelName: "order" }
  );
  return Order;
};
