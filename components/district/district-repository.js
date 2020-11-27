/**
 * Template file for Repository layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

// import District from './district';
const District = require('./district');

class districtRepository {
    async get() {
        const data = await District.find().sort({ createdAt: -1 }).exec();
        return data;
    }
    async count() {
        const data = await District.count({}).exec();
        return data;
    }
    async findById(id) {
        const data = await District.findById({ _id: id }).exec();
        return data;
    }
    async create(data) {
        const create = await new District(data).save();
        return create;
    }
    async updateById(id, update) {
        const data = await District.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
        return data;
    }
    async delete(id) {
        const data = await District.remove({ _id: id }).exec();
        return data;
    }
}

module.exports = districtRepository;

