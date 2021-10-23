"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class Cart extends Model { }
    Cart.init({
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        { sequelize, modelName: "cart" }
    );
    return Cart;
};
