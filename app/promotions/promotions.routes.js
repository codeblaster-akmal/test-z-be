'use strict';
const { list, create, promotionById, update, remove } = require("./promotions.controller");

module.exports = app => {

    app.get('/promotions', list);

    app.post('/promotions', create);

    app.get('/promotions/:id', promotionById);

    app.put('/promotions/:id', update);

    app.delete('/promotions/:id', remove);

};