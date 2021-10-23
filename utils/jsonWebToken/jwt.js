const jwt = require('jsonwebtoken');
require("dotenv").config();

/* JWT Tokens */

/* on-login valid customer */
/* token-payload parameter (customer-id, -username, -phone) */
/* secret/public key must be same on verify jwt */
/* Token expiresTime */
exports.jwtTokens = async (data) => {
    const createToken = await jwt.sign({ id: data.id, email: data.email, phone: data.phone }, process.env.JWT_SECRET_KEY/* , { expiresIn: '60s' } */);
    return createToken;
}

/* Verify-Token */
/* Token pass from Header Key- authorization --> Value [Bearer xyzTokens] */
/* Add decode tokenInfo in request object */
exports.verifyToken = async (request, response, next) => {
    try {
        const verifyToken = request.headers.authorization.split(" ")[1]; // Bearer & token split by ' ' -->[ ]
        const decode = jwt.verify(verifyToken, process.env.JWT_SECRET_KEY);
        request.tokenData = decode;
        next();
    } catch (error) {
        response.status(401).json({ error: 'Invalid token' });
        next(error);
    }
}