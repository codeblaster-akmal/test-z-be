'use strict';

const { list, create, warehouseStockById, update, remove } = require("./warehouseStocks.controller");

module.exports = app => {

    app.get('/warehouse-stocks', list);

    app.post('/warehouse-stocks', create);

    app.get('/warehouse-stocks/:id', warehouseStockById);

    app.put('/warehouse-stocks/:id', update);

    app.delete('/warehouse-stocks/:id', remove);

};