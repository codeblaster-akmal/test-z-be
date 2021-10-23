'use strict';

const { list, create, uomById, update, remove } = require("./uoms.controller");

module.exports = app => {

    app.get('/uoms', list);

    app.post('/uoms', create);

    app.get('/uoms/:id', uomById);

    app.put('/uoms/:id', update);

    app.delete('/uoms/:id', remove);

};