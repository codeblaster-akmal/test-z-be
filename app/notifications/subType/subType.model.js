'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class subType extends Model { }
    subType.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
            unique: {
                args: true,
                msg: 'Name already exists'
            },
            validate: {
                is: {
                    args: /^([A-Za-z-&,\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
                    msg: 'Name not allow any numbers or special character',
                },
                max: {
                    args: 30,
                    msg: 'Maximum length upto 30'
                },
            },
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue:1
        },
    }, { sequelize, modelName: 'sub-type' });
    return subType;
}