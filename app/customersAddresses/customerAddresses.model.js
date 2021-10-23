'use strict'

module.exports = (sequelize, { DataTypes, Model }) => {
    class CustomerAddress extends Model { }
    CustomerAddress.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 30],
                    msg: 'Maximum Name length upto 30'
                }
            }
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 70],
                    msg: 'Address line 1 length must between 1 to 70'
                },
            }
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 70],
                    msg: 'Address line 2 length must between 1 to 70'
                },
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postcode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 16],
                    msg: 'Invalid postcode'
                }
            }
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
    }, { sequelize, modelName: 'customer_address' });
    return CustomerAddress;
}