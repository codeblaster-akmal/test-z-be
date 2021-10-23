'use strict';

const { CONSTANTS } = require("../../utils/constants");

module.exports = (sequelize, { DataTypes, Model }) => {
    class CustomersProfileMst
        extends Model { }
    CustomersProfileMst.init({
        firstName: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [2, 45],
                    msg: 'Length must between 5 to 45'
                },
            },
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [2, 45],
                    msg: 'Length must between 5 to 45'
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Customer with similar email already exists'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email'
                },
                len: {
                    args: [5, 45],
                    msg: 'Length must between 5 to 45'
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 255],
                    msg: 'Length must between 5 to 255'
                },
            }
        },
        mobile: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Mobile number already exists'
            },
            validate: {
                len: {
                    args: [0, 30],
                    msg: 'Maximum length upto 30'
                }
            }
        },
        telephone: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Telephone number already exists'
            },
            validate: {
                len: {
                    args: [0, 30],
                    msg: 'Maximum length upto 30'
                }
            }
        },
        customerSeqId: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'customerSeqId is already exist'
            },
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: CONSTANTS.CUSTOMER_DEFAULT_IMAGE,
            validate: {
                len: {
                    args: [2, 200],
                    msg: 'Length must between 2 to 200'
                },
            },
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        },
        gender: {
            type: DataTypes.ENUM,
            values: ['MALE', 'FEMALE', 'OTHERS'],
            defaultValue: 'MALE',
        },
        isNewsLetter: {
            type: DataTypes.BOOLEAN
        },
        isPromoDiscount: {
            type: DataTypes.BOOLEAN
        },
        otpSignup: {
            type: DataTypes.STRING
        },
        otpFp: {
            type: DataTypes.STRING
        },
        expiryTime: {
            type: DataTypes.INTEGER
        },
        expiryTimeFp: {
            type: DataTypes.INTEGER
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        otlTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        otlTimeFp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { sequelize, modelName: 'customers_profile_mst' });
    return CustomersProfileMst;
}