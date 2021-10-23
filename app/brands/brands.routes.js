'use strict';

const { list, create, brandById, update, remove } = require("./brands.controller");

module.exports = (app, db) => {

    app.get('/brands', list);

    app.post('/brands', create);

    app.get('/brands/:id', brandById);

    app.put('/brands/:id', update);

    app.delete('/brands/:id', remove);

};