'use strict';

const { list, create, subGroupById, update, remove } = require("./subGroups.controller");

module.exports = app => {

    app.get('/sub-groups', list);

    app.post('/sub-groups', create);

    app.get('/sub-groups/:id', subGroupById);

    app.put('/sub-groups/:id', update);

    app.delete('/sub-groups/:id', remove);

};