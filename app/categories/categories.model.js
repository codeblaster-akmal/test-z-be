'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class Category extends Model { }
    Category.init({
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
        menuPriority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Menu priority already exists'
            },
            validate: {
                len: {
                    args: [0, 9],
                    msg: 'Maximum point length upto 9'
                }
            }
        },
        banner: {
            type: DataTypes.STRING,
            validate: {
                max: {
                    args: 250,
                    msg: 'Banner maximum length upto 250'
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
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
    }, { sequelize, modelName: 'category' });
    return Category;
}