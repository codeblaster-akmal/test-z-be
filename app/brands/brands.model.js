'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class Brands extends Model { }
    Brands.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
            unique: {
                args: true,
                msg: 'Name already exists'
            },
            validate: {
                max: {
                    args: 30,
                    msg: 'Maximum length upto 30'
                },
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: 250,
                    msg: 'Image maximum length upto 250'
                },
            },
        },
        status: {
            type: DataTypes.BOOLEAN
        },
    }, { sequelize, modelName: 'brand' });
    return Brands;
}