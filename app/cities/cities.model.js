'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class City extends Model { }
    City.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, { sequelize, modelName: 'city' });
    return City;
}