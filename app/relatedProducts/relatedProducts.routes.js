'use strict';

const { list, create, relatedProductById, update, remove } = require("./relatedProducts.controller");

module.exports = app => {

    app.get('/related-products', list);

    app.post('/related-products', create);

    app.get('/related-products/:id', relatedProductById);

    app.put('/related-products/:id', update);

    app.delete('/related-products/:id', remove);

};