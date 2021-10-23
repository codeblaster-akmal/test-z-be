'use strict';

const { CONSTANTS } = require("../../utils/constants");

module.exports = (sequelize, { DataTypes, Model }) => {
    class Promotion extends Model { }
    Promotion.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 50],
                    msg: CONSTANTS.DATA_LENGTH_ERROR_MESSAGE("Name", 1, 50)
                }
            }
        },
        image: {
            type: DataTypes.STRING,
        },
        startDate: {
            type: DataTypes.DATE,
        },
        endDate: {
            type: DataTypes.DATE,
        },
        discountType: {
            type: DataTypes.ENUM,
            values: ['PERCENTAGE', 'PRICE', ''],
            defaultValue: ''
        },
        discountValue: {
            type: DataTypes.FLOAT,
            defaultValue: 0.00,
        },
        type: {
            type: DataTypes.ENUM,
            values: ['ALL PRODUCTS', 'SPECIFIC PRODUCT', 'BRAND', 'CATEGORY', ''],
            defaultValue: '',
        },
        isEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['NEW', 'RUNNING', 'EXPIRED', ''],
            defaultValue: '',
        },
    }, { sequelize, modelName: 'promotion' });
    return Promotion;
}