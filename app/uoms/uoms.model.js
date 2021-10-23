'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class Uom extends Model { }
    Uom.init({
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
        status: {
            type: DataTypes.BOOLEAN
        },
    }, { sequelize, modelName: 'uom' });
    return Uom;
}