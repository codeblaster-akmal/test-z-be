'use strict';

const { login } = require("./auth.controller");

module.exports = (app) => {
    app.post('/user-login', login);

};