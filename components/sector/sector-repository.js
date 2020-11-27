/**
 * Template file for Repository layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

// import Sector from './sector';
const Sector = require('./sector');

class sectorRepository {
    async get() {
        const data = await Sector.find().sort({ createdAt: -1 }).exec();
        return data;
    }
    async count() {
        const data = await Sector.count({}).exec();
        return data;
    }
    async findById(id) {
        const data = await Sector.findById({ _id: id }).exec();
        return data;
    }
    async create(data) {
        const create = await new Sector(data).save();
        return create;
    }
    async updateById(id, update) {
        const data = await Sector.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
        return data;
    }
    async delete(id) {
        const data = await Sector.remove({ _id: id }).exec();
        return data;
    }
}

module.exports = sectorRepository;

