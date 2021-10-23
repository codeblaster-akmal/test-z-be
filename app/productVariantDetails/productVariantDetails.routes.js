'use strict';

const { list, create, productVariantDetailById, update, remove } = require("./productVariantDetails.controller");

module.exports = (app, db) => {

    app.get('/product-variant-details', list);

    app.post('/product-variant-details', create);

    app.get('/product-variant-details/:id', productVariantDetailById);

    app.put('/product-variant-details/:id', update);

    app.delete('/product-variant-details/:id', remove);



};