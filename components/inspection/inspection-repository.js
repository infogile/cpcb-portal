/**
 * Template file for Repository layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

// import Inspection from './inspection';
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
const Inspection = require("./inspection");
const Factory = require("../factory/factory");

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
    const data = await Inspection.findOneAndUpdate({ _id: id }, update, {
      new: true,
    }).exec();
    return data;
  }
  async updateAction(id, action) {
    const data = await Inspection.findOneAndUpdate(
      { _id: id },
      { $push: { actions: action } },
      {
        new: true,
      }
    ).exec();
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
  async allInspectionsGroupedByStatus() {
    const data = await Inspection.aggregate([
      {
        $group: {
          _id: {
            status: "$status",
          },
          count: { $sum: 1 },
          factory: {
            $push: "$$factory.basin",
          },
        },
      },
    ]).exec();
    return data;
  }
  async myInspection(id, date) {
    const data = await Inspection.find({
      assignedTo: id,
      createdAt: { $gt: new Date(date) },
      status: 0,
    })
      .select("factory")
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
        select: "basin",
        populate: [
          { path: "basin" },
        ],
      })
      .exec();
    return data;
  }
  async allInspection() {
    const data = await Inspection.find()
      .select(["factory", "status", "report","assignedTo", "inspectionDate", 

    ])
      .populate([
      {
        path: "factory",
        populate: [
          { path: "basin" },
          { path: "state", select: "name"},
          { path: "sector", select: "name"},
        ],
      },
      {
        path: "assignedTo",
        select: "username",
      },
    ])
      .exec();
    return data;
  }
  async myCompletedInspections(stateId) {
    let data = [];
    const factoriesInState = await Factory.find({
      state: stateId,
    })
      .select(["_id"])
      .exec();
    if (factoriesInState && factoriesInState.length > 0) {
      const factoryIds = factoriesInState.map((fac) => fac.id);

      data = await Inspection.find({
        factory: { $in: factoryIds },
        status: { $gt: 0 },
      })
        .select(["factory", "status", "reports", "assignedTo"])
        .populate([
          {
            path: "factory",
            populate: [
              { path: "sector" },
              { path: "state", select: "name" },
              { path: "district", select: "name" },
              { path: "basin" },
            ],
          },
          {
            path: "assignedTo",
            select: "username",
          },
        ])
        .exec();
    }
    return data;
  }
  async getInpsectionReport(id) {
    const data = await Inspection.findById(id)
      .select()
      .populate({
        path: "factory",
        populate: [{ path: "basin" }, { path: "sector" }],
      })
      .exec();
    return data;
  }
  async getFieldReport(reportId) {
    const data = await Inspection.findById(reportId)
      .select([
        "factory",
        "status",
        "fieldReport",
        "actions",
        "assignedTo",
        "attendance",
        "updatedAt",
      ])
      .populate({
        path: "factory",
        populate: [{ path: "basin" }, { path: "sector" }],
      })
      .exec();
    return data;
  }
}

module.exports = inspectionRepository;
