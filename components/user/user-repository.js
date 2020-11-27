/**
 * Template file for Repository layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

// import User from './user';
const User = require('./user');

class userRepository {
    async get() {
        const data = await User.find().sort({ createdAt: -1 }).exec();
        return data;
    }
    async count() {
        const data = await User.countDocuments({}).exec();
        return data;
    }
    async findById(id) {
        const data = await User.findById({ _id: id }).exec();
        return data;
    }
    async create(data) {
        const create = await new User(data).save();
        return create;
    }
    async updateById(id, update) {
        const data = await User.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
        return data;
    }
    async delete(id) {
        const data = await User.remove({ _id: id }).exec();
        return data;
    }
}
module.exports = userRepository;
