const { User } = require("../models");

module.exports = {
    async create(params) {
        return await User.create(params);
    },
    async findOne(params) {
        let where = {};

        if (params._id) {
            where['_id'] = params._id
        }
        if (params.email) {
            where['email'] = params.email;
        }
        return await User.findOne({ where });
    },
    async findAll() {
        return await User.findAll({});
    },
    async update(updateObj, params) {
        return await updateObj.updateOne(params);
    },
    async delete(userObj) {
        return await userObj.deleteOne();
    }
}