'use strict';

const { list, create, subTypeById, update, remove } = require("./subType.controller");

module.exports = (app, db) => {

    app.get('/sub-types', list);

    app.post('/sub-types', create);

    app.get('/sub-types/:id', subTypeById);

    app.put('/sub-types/:id', update);

    app.delete('/sub-types/:id', remove);

};