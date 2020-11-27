/**
 * Template file for Repository layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

// import State from './state';
const State = require('./state');

class stateRepository {
    async get() {
        const data = await State.find().sort({ createdAt: -1 }).exec();
        return data;
    }
    async count() {
        const data = await State.count({}).exec();
        return data;
    }
    async findById(id) {
        const data = await State.findById({ _id: id }).exec();
        return data;
    }
    async create(data) {
        const create = await new State(data).save();
        return create;
    }
    async updateById(id, update) {
        const data = await State.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
        return data;
    }
    async delete(id) {
        const data = await State.remove({ _id: id }).exec();
        return data;
    }
}

module.exports = stateRepository;

