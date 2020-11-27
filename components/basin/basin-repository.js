/**
 * Template file for Repository layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

// import Basin from './basin';
const Basin = require('./basin');

class basinRepository {
    async get() {
        const data = await Basin.find().sort({ createdAt: -1 }).exec();
        return data;
    }
    async count() {
        const data = await Basin.count({}).exec();
        return data;
    }
    async findById(id) {
        const data = await Basin.findById({ _id: id }).exec();
        return data;
    }
    async create(data) {
        const create = await new Basin(data).save();
        return create;
    }
    async updateById(id, update) {
        const data = await Basin.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
        return data;
    }
    async delete(id) {
        const data = await Basin.remove({ _id: id }).exec();
        return data;
    }
}

module.exports = basinRepository;

