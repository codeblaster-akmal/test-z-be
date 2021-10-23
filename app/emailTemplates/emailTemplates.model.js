'use strict';

module.exports = (sequelize, { DataTypes, Model }) => {
    class EmailTemplate extends Model { }
    EmailTemplate.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 30],
                    msg: 'Name length between 1 to 30'
                },
            },
        },
        subject: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 30],
                    msg: 'Subject length between 1 to 30'
                },
            },
        },
        description: {
            type: DataTypes.TEXT
        }
    }, { sequelize, modelName: 'email_template' });
    return EmailTemplate;
}