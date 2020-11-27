/**
 * Template file for Repository layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

// import Factory from './factory';
const Factory = require('./factory');

class factoryRepository {
    async get() {
        const data = await Factory.find().sort({ createdAt: -1 }).exec();
        return data;
    }
    async count() {
        const data = await Factory.count({}).exec();
        return data;
    }
    async findById(id) {
        const data = await Factory.findById({ _id: id }).exec();
        return data;
    }
    async create(data) {
        const create = await new Factory(data).save();
        return create;
    }
    async updateById(id, update) {
        const data = await Factory.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
        return data;
    }
    async delete(id) {
        const data = await Factory.remove({ _id: id }).exec();
        return data;
    }
}

module.exports = factoryRepository;

