'use strict';

const { list, create, siteSectionById, update, remove } = require("./siteSections.controller");

module.exports = app => {

    app.get('/site-sections', list);

    app.post('/site-sections', create);

    app.get('/site-sections/:id', siteSectionById);

    app.put('/site-sections/:id', update);

    app.delete('/site-sections/:id', remove);

};