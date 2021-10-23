'use strict';

const { list, create, customerAddressById, update, remove } = require("./customerAddresses.controller");

module.exports = app => {

    app.get('/customer-addresses', list);

    app.post('/customer-addresses',  create);

    app.get('/customer-addresses/:id',  customerAddressById);

    app.put('/customer-addresses/:id', update);

    app.delete('/customer-addresses/:id', remove);

};