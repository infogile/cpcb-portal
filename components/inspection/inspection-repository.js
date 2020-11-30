/**
 * Template file for Repository layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

// import Inspection from './inspection';
const mongoose = require('mongoose');
const Inspection = require('./inspection');

class inspectionRepository {
    async get() {
        const data = await Inspection.find().sort({ createdAt: -1 }).exec();
        return data;
    }
    async count() {
        const data = await Inspection.count({}).exec();
        return data;
    }
    async findById(id) {
        const data = await Inspection.findById({ _id: id }).exec();
        return data;
    }
    async create(data) {
        const create = await new Inspection(data).save();
        return create;
    }
    async updateById(id, update) {
        const data = await Inspection.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
        return data;
    }
    async delete(id) {
        const data = await Inspection.remove({ _id: id }).exec();
        return data;
    }
    async query(query) {
        const data = await Inspection.find(query).exec();
        return data;
    }
    async agg(agg) {
        const data = await Inspection.aggregate(agg).exec();
        return data;
    }
    async myInspection(id, date) {
        const data = await Inspection.find({ assignedTo: id, createdAt: { $gt: new Date(date) }, status: 0 })
            .select('factory')
            .populate({
                path: 'factory',
                populate: [
                    { path: 'sector' },
                    { path: 'state', select: 'name' },
                    { path: 'district', select: 'name' },
                    { path: 'basin' },
                ],
            })
            .exec();
        return data;
    }
    async myActiveInspection(id) {
        const data = await Inspection.find({
        assignedTo: id,
        status: 1,
        })
        .select(["factory", "status"])
        .populate({
            path: "factory",
            populate: [
            { path: "sector" },
            { path: "state", select: "name" },
            { path: "district", select: "name" },
            { path: "basin" },
            ],
        })
        .exec();
        return data;
    }
    async myAllInspection(id) {
        const data = await Inspection.find({
        assignedTo: id,
        })
        .select(["factory", "status"])
        .populate({
            path: "factory",
            populate: [
            { path: "sector" },
            { path: "state", select: "name" },
            { path: "district", select: "name" },
            { path: "basin" },
            ],
        })
        .exec();
        return data;
    }
    async getFieldReport(reportId) {
        const data = await Inspection.findById(reportId)
        .select(["factory", "status", "fieldReport"])
        .populate({
            path: "factory",
            populate: [{ path: "basin" }, { path: "sector" }],
        })
        .exec();
        return data;
    }
}

module.exports = inspectionRepository;
