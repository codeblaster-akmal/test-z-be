'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class WarehouseStock extends Model { }
    WarehouseStock.init({
        qty: {
            type: DataTypes.INTEGER,
        },
    }, { sequelize, modelName: 'warehouse_stock' });
    return WarehouseStock;
}