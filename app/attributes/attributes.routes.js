'use strict';

const { list, create, attributeById, update, remove } = require("./attributes.controller");

module.exports = (app, db) => {

    app.get('/attributes', list);

    app.post('/attributes', create);

    app.get('/attributes/:id', attributeById);

    app.put('/attributes/:id', update);

    app.delete('/attributes/:id', remove);

};