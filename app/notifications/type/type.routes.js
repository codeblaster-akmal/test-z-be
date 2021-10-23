'use strict';

const { list, create, typeById, update, remove } = require("./type.controller");

module.exports = (app, db) => {

    app.get('/types', list);

    app.post('/types', create);

    app.get('/types/:id', typeById);

    app.put('/types/:id', update);

    app.delete('/types/:id', remove);

};