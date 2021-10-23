'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class County extends Model { }
    County.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, { sequelize, modelName: 'county' });
    return County;
}