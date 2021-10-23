'use strict';

const { list, remove } = require("./productImages.controller");

module.exports = app => {

    app.get('/product-images', list);

    app.delete('/product-image/:id', remove);
};