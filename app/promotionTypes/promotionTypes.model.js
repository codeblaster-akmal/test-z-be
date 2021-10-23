'use strict';

const { CONSTANTS } = require("../../utils/constants");

module.exports = (sequelize, { DataTypes, Model }) => {
    class PromotionType extends Model { }
    PromotionType.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 50],
                    msg: CONSTANTS.DATA_LENGTH_ERROR_MESSAGE("Name", 1, 50)
                }
            }
        }
    }, { sequelize, modelName: 'promotion_type' });
    return PromotionType;
}