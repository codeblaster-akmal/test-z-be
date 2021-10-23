'use strict';

const { list, create, sequenceById, update, remove } = require("./sequences.controller");

module.exports = (app) => {

    app.get('/sequences', list);

    app.post('/sequences', create);

    app.get('/sequences/:id', sequenceById);

    app.put('/sequences/:id', update);

    app.delete('/sequences/:id', remove);

};