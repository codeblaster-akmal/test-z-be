'use strict';

const { list, create, siteSectionItemById, update, remove } = require("./siteSectionItems.controller");

module.exports = app => {

    app.get('/site-section-items', list);

    app.post('/site-section-items', create);

    app.get('/site-section-items/:id', siteSectionItemById);

    app.put('/site-section-items/:id', update);

    app.delete('/site-section-items/:id', remove);

};