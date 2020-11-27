/**
 * Template file for Controller layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

const Repository = require('./user-repository');
const transformer = require('./user-transformer');
const ErrorHandler = require('ErrorHandler');

module.exports = {
    async get(req, res) {
        try {
            const repo = new Repository();
            const data = await repo.get();
            return res.json({ data: data });
        } catch (error) {
            throw new ErrorHandler(
                500,
                `Unknown Error Occured : ${error.message || error} `,
                // 'controller_error',
                // error,
            );
        }
    },
    async count(req, res) {
        try {
            const repo = new Repository();
            const data = await repo.count();
            return res.json({ data: data });
        } catch (error) {
            throw new ErrorHandler(
                500,
                `Unknown Error Occured : ${error.message || error} `,
                // 'controller_error',
                // error,
            );
        }
    },
    async findOne(req, res) {
        try {
            const id = req.params.id;
            const repo = new Repository();
            const data = await repo.findById(id);
            return res.json({ data: data });
        } catch (error) {
            throw new ErrorHandler(
                500,
                `Unknown Error Occured : ${error.message || error} `,
                // 'controller_error',
                // error,
            );
        }
    },
    async create(req, res) {
        try {
            const repo = new Repository();
            const data = await repo.create(req.body);
            // want to update data
            // return res.json({
            //     data: transformer.create(data),
            // });
            // without update data
            return res.json({
                data: data,
            });
        } catch (error) {
            throw new ErrorHandler(
                500,
                `Unknown Error Occured : ${error.message || error} `,
                // 'controller_error',
                // error,
            );

            // console.log(error);
        }
    },
    async update(req, res) {
        try {
            const repo = new Repository();
            const id = req.params.id;
            const update = req.body;
            const data = await repo.updateById(id, update);
            return res.json({ data: data });
        } catch (error) {
            throw new ErrorHandler(
                500,
                `Unknown Error Occured : ${error.message || error} `,
                // 'controller_error',
                // error,
            );
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const repo = new Repository();
            const data = repo.delete(id);
            return res.json({ data: data });
        } catch (error) {
            throw new ErrorHandler(
                500,
                `Unknown Error Occured : ${error.message || error} `,
                // 'controller_error',
                // error,
            );
        }
    },
};
