'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class Configuration extends Model { }
    Configuration.init({
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            
            unique: {
                args: true,
                msg: 'Configuration is already exist'
            },
            validate: {
                len: {
                    args: [2, 40],
                    msg: 'Configuration name length between 2 to 40'
                },
            },
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, { sequelize, modelName: 'configuration' });
    return Configuration;
}