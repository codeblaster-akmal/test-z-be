'use strict';

const { list, remove } = require("./productAttributeImages.controller");

module.exports = app => {

    app.get('/product-attribute-images', list);

    app.delete('/product-attribute-images/:id', remove);
};