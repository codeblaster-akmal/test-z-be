'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class Variant extends Model { }
    Variant.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        isImage: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
    }, { sequelize, modelName: 'variant' });
    return Variant;
}