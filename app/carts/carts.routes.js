'use strict';

const { list, create, cartById, update, remove } = require("./carts.controller");

module.exports = (app, db) => {

    app.get('/carts', list);

    app.post('/carts', create);

    app.get('/carts/:id', cartById);

    app.put('/carts/:id', update);

    app.delete('/carts/:id', remove);

};