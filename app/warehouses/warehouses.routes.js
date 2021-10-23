'use strict';

const { list, create, warehouseById, update, remove } = require("./warehouses.controller");

module.exports = app => {

    app.get('/warehouses', list);

    app.post('/warehouses', create);

    app.get('/warehouses/:id', warehouseById);

    app.put('/warehouses/:id', update);

    app.delete('/warehouses/:id', remove);

};