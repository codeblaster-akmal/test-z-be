'use strict';

const { list, create, productVariantById, update, remove } = require("./productVariants.controller");

module.exports = (app, db) => {

    app.get('/product-variants', list);

    app.post('/product-variants', create);

    app.get('/product-variants/:id', productVariantById);

    app.put('/product-variants/:id', update);

    app.delete('/product-variants/:id', remove);



};