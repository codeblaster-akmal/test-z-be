'use strict';

const { list, create, configurationById, update, remove } = require("./configurations.controller");

module.exports = (app, db) => {

    app.get('/configurations', list);

    app.post('/configurations', create);

    app.get('/configurations/:id', configurationById);

    app.put('/configurations/:id', update);

    app.delete('/configurations/:id', remove);

};