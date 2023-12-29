const jwt = require('jsonwebtoken');
const { config } = require('../configuration');
const { secret, expiry } = config.jwt;
module.exports.generateToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: expiry });
}

module.exports.verifyToken = async (token) => {
    return jwt.verify(token, secret);
}