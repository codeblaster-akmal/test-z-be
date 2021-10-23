'use strict';

const { list, create, emailTemplateById, update, remove } = require("./emailTemplates.controller");

module.exports = (app, db) => {

    app.get('/email-templates', list);

    app.post('/email-templates', create);

    app.get('/email-templates/:id', emailTemplateById);

    app.put('/email-templates/:id', update);

    app.delete('/email-templates/:id', remove);

};