'use strict';

const { list, create, groupById, update, remove } = require("./groups.controller");

module.exports = (app, db) => {

    app.get('/groups', list);

    app.post('/groups', create);

    app.get('/groups/:id', groupById);

    app.put('/groups/:id', update);

    app.delete('/groups/:id', remove);

};