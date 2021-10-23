'use strict';

const { list, create, promotionTypeById, update, remove } = require("./promotionTypes.controller");

module.exports = app => {

    app.get('/promotion-types', list);

    app.post('/promotion-types', create);

    app.get('/promotion-types/:id', promotionTypeById);

    app.put('/promotion-types/:id', update);

    app.delete('/promotion-types/:id', remove);

};