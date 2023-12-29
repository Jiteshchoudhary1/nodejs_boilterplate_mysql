// import { compare, hash } from 'bcryptjs';
const { compare, hash } = require('bcryptjs');
module.exports.passwordEncryption = async (password) => {
    return await hash(password, 10);
}

module.exports.comparePassword = async (password, hashPassword) => {
    return await compare(password, hashPassword);
}
