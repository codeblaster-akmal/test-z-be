'use strict';

const { CONSTANTS } = require("../../utils/constants");

module.exports = (sequelize, { DataTypes, Model }) => {
    class Warehouse extends Model { }
    Warehouse.init({
        type: {
            type: DataTypes.ENUM,
            values: ["WAREHOUSE", "STORE", "SALON"],
            defaultValue: "WAREHOUSE",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [2, 30],
                    msg: CONSTANTS.DATA_LENGTH_ERROR_MESSAGE("Browser title", 0, 30)
                },
            },
        },
        addressLine1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressLine2: {
            type: DataTypes.STRING,
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 16],
                    msg: CONSTANTS.DATA_LENGTH_ERROR_MESSAGE("Postcode", 2, 16)
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        },
        contactPerson: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: CONSTANTS.INVALID_ERROR_MESSAGE("email")
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [4, 30],
                    msg: CONSTANTS.DATA_LENGTH_ERROR_MESSAGE("Phone Number", 4, 30)
                }
            }
        },
    }, { sequelize, modelName: 'warehouse' });
    return Warehouse;
}