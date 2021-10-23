'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class Sequence extends Model { }
    Sequence.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Name must be unique'
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Name is mandatory'
                },
                notIn: {
                    args: [['null', 'Null', 'NULL']],
                    msg: 'Name cannot be null'
                },
            }
        },
        startValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Start-value is mandatory'
                }
            }
        },
        prefix: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Prefix must be unique'
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Prefix is mandatory'
                },
                notIn: {
                    args: [['null', 'Null', 'NULL']],
                    msg: 'Prefix cannot be null'
                },
            }
        },
        sufix: {
            type: DataTypes.STRING
        },
        numberofDigit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Number-of-digit is mandatory'
                }
            }
        },
        startFrom: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Start-from is mandatory'
                }
            }
        },
        separator: {
            type: DataTypes.STRING
        },
    }, { sequelize, modelName: 'sequence' });
    return Sequence;
}