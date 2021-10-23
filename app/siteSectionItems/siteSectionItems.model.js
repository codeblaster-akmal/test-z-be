'use strict';

module.exports = (sequelize, { Model }) => {
    class SiteSectionItem extends Model { }
    SiteSectionItem.init({}, { sequelize, modelName: 'site_section_item' });
    return SiteSectionItem;
}