'use strict';

module.exports = (sequelize, { Model }) => {
    class PromotionItem extends Model { }
    PromotionItem.init({}, { sequelize, modelName: 'promotion_item' });
    return PromotionItem;
}