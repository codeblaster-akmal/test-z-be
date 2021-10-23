'use strict';

const { list, create, promotionItemById, update, remove } = require("./promotionItems.controller");

module.exports = app => {

    app.get('/promotion-items', list);

    app.post('/promotion-items', create);

    app.get('/promotion-items/:id', promotionItemById);

    app.put('/promotion-items/:id', update);

    app.delete('/promotion-items/:id', remove);

};