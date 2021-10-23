'use strict';

const { list, create, cityById, update, remove } = require("./cities.controller");

module.exports = app => {

    app.get('/cities', list);

    app.post('/cities', create);

    app.get('/cities/:id', cityById);

    app.put('/cities/:id', update);

    app.delete('/cities/:id', remove);

};