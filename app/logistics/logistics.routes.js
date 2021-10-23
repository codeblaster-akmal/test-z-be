'use strict';

const { list, create, logisticById, update, remove } = require("./logistics.controller");

module.exports = (app, db) => {

    app.get('/logistics', list);

    app.post('/logistics', create);

    app.get('/logistics/:id', logisticById);

    app.put('/logistics/:id', update);

    app.delete('/logistics/:id', remove);

};