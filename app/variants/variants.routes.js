'use strict';

const { list, create, variantById, update, remove } = require("./variants.controller");

module.exports = (app, db) => {

    app.get('/variants', list);

    app.post('/variants', create);

    app.get('/variants/:id', variantById);

    app.put('/variants/:id', update);

    app.delete('/variants/:id', remove);

};