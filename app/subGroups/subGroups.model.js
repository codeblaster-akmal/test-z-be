'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class SubGroup extends Model { }
    SubGroup.init({
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
        isReturn: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
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
    }, { sequelize, modelName: 'sub_group' });
    return SubGroup;
}