'use strict';

const db = require("../../config/db");
const { decrypt } = require("../../utils/encryptNdecrypt/bcrypt");
const { jwtTokens } = require("../../utils/jsonWebToken/jwt");

exports.login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        const conditions = { where: { email: email } }
        const user = await db.customersProfileMst.findOne(conditions);
        if (user === null) {
            response.status(400).json({ error: 'Invalid username & password' });
        } else {
            const match = await decrypt(password, user);
            if (!match) {
                response.status(400).json({ error: 'Invalid username & password' });
            }else{
                const jwtToken = await jwtTokens(user);
                let result = {
                    customer:user,
                    jwtToken
                }
                response.status(200).json(result);
            }
        }
    } catch (error) {
        next(error);
    }
};