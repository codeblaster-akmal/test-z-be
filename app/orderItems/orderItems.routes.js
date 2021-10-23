'use strict';

const { list, create, orderItemsById, update, remove } = require("./orderItems.controller");

module.exports = (app, db) => {

    app.get('/order-items', list);

    app.post('/order-items', create);

    app.get('/order-items/:id', orderItemsById);

    app.put('/order-items/:id', update);

    app.delete('/order-items/:id', remove);

};