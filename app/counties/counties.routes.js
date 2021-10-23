'use strict';

const { list, create, countyById, update, remove } = require("./counties.controller");

module.exports = app => {

    app.get('/counties', list);

    app.post('/counties', create);

    app.get('/counties/:id', countyById);

    app.put('/counties/:id', update);

    app.delete('/counties/:id', remove);

};