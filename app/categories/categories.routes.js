'use strict';

const { list, create, categoryById, update, remove } = require("./categories.controller");

module.exports = (app, db) => {

    app.get('/categories', list);

    app.post('/categories', create);

    app.get('/categories/:id', categoryById);

    app.put('/categories/:id', update);

    app.delete('/categories/:id', remove);

};