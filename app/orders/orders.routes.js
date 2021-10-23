'use strict';

const { list, create, orderById, update, remove } = require("./orders.controller");

module.exports = (app, db) => {

    app.get('/orders', list);

    app.post('/orders', create);

    app.get('/orders/:id', orderById);

    app.put('/orders/:id', update);

    app.delete('/orders/:id', remove);

};