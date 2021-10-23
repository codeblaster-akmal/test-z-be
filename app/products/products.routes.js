'use strict';

const { list, create, productById, update, updateJsonData, remove } = require("./products.controller");

module.exports = app => {

    app.get('/products', list);

    app.post('/products', create);

    app.get('/products/:id', productById);

    app.put('/products/:id', update);

    app.put('/products-data/:id', updateJsonData);

    app.delete('/products/:id', remove);

};