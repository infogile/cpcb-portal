/**
 * Template file for Controller layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */
const mongoose = require("mongoose");
const Repository = require("./inspection-repository");
const UserRepository = require("../user/user-repository");
const transformer = require("./inspection-transformer");
const ErrorHandler = require("ErrorHandler");
var aws = require("aws-sdk"),
  multer = require("multer"),
  multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.SECRETACCESSKEY,
  accessKeyId: process.env.ACCESSKEYID,
  region: "ap-south-1",
});
var s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "cpcbsuraj/field/images",
    acl: "public-read",
    cacheControl: "max-age=31536000",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}_${req.user._id}`);
    },
  }),
});

const multiUpload = upload.array("images", 100);

module.exports = {
  async get(req, res) {
    try {
      const repo = new Repository();
      const data = await repo.get();
      return res.json({ data: data });
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Unknown Error Occured : ${error.message || error} `
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
        `Unknown Error Occured : ${error.message || error} `
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
        `Unknown Error Occured : ${error.message || error} `
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
        `Unknown Error Occured : ${error.message || error} `
        // 'controller_error',
        // error,
      );
    }
  },
  // TODO: work with api
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
        `Unknown Error Occured : ${error.message || error} `
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
        `Unknown Error Occured : ${error.message || error} `
        // 'controller_error',
        // error,
      );
    }
  },
  async myStatus(req, res) {
    const agg = [
      {
        $match: {
          assignedTo: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $project: {
          item: 1,
          assigned: {
            $cond: [
              {
                $gte: ["$status", 0],
              },
              1,
              0,
            ],
          },
          inspected: {
            $cond: [
              {
                $gte: ["$status", 1],
              },
              1,
              0,
            ],
          },
          bypass: {
            $cond: [{ $eq: ["$sos", "bypass"] }, 1, 0],
          },
          unitclose: {
            $cond: [{ $eq: ["$fieldReport.uos", "non-operational"] }, 1, 0],
          },
        },
      },
      {
        $group: {
          _id: "$item",
          totalAssigned: {
            $sum: "$assigned",
          },
          totalInspected: {
            $sum: "$inspected",
          },
          totalBypass: {
            $sum: "$bypass",
          },
          totalClosed: {
            $sum: "$unitclose",
          },
        },
      },
    ];
    try {
      const repo = new Repository();
      let data = await repo.agg(agg);
      // Transform data
      data = transformer.dashboardReport(data);
      return res.json(data);
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Unknown Error Occured : ${error.message || error} `
        // 'controller_error',
        // error,
      );
    }
  },
  async allInspectionsGroupedByStatus(req, res) {
    try {
      const repo = new Repository();
      let data = await repo.allInspectionsGroupedByStatus();
      return res.json(data);
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Unknown Error Occured : ${error.message || error} `
        // 'controller_error',
        // error,
      );
    }
  },
  async myInspection(req, res) {
    try {
      const repo = new Repository();
      let data = await repo.myInspection(req.user._id, req.body.date);
      return res.json(data);
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Unknown Error Occured : ${error.message || error} `
        // 'controller_error',
        // error,
      );
    }
  },
  async myActiveInspection(req, res) {
    try {
      const repo = new Repository();
      let data = await repo.myActiveInspection(req.user._id);
      return res.json(data);
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Unknown Error Occured : ${error.message || error} `
        // 'controller_error',
        // error,
      );
    }
  },
  async myAllInspection(req, res) {
    try {
      const repo = new Repository();
      let data = await repo.myAllInspection(req.user._id);
      return res.json(data);
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Unknown Error Occured : ${error.message || error} `
        // 'controller_error',
        // error,
      );
    }
  },
  async myCompletedInspections(req, res) {
    try {
      const repo = new Repository();
      let data = await repo.myCompletedInspections(req.user.state);
      return res.json(data);
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Unknown Error Occured : ${error.message || error} `
        // 'controller_error',
        // error,
      );
    }
  },
  async getFieldReport(req, res) {
    try {
      const repo = new Repository();
      const params = req.params;
      let data = await repo.getFieldReport(params.report_id);
      return res.json(data);
    } catch (error) {
      throw new ErrorHandler(
        500,
        `Unknown Error Occured : ${error.message || error} `
        // 'controller_error',
        // error,
      );
    }
  },
  async myFieldReport(req, res) {
    try {
      multiUpload(req, res, async function (err) {
        let links = await transformer.s3BucketFileslocation(req.files);
        let data = JSON.parse(req.body.body);
        data.fieldReport.images = links;
        data = { ...data, status: 1 };
        const repo = new Repository();
        const result = await repo.updateById(data.id, data);
        if (result._id) {
          res.json({ success: true, id: result._id });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(403).json({ name: "Invalid response" });
    }
  },
  async uploadReport(req, res) {
    try {
      if (!req.file) {
        res.status(505).send({
          success: false,
          message: "No file uploaded",
        });
      }
      res.send({
        success: true,
        message: "file uploaded",
        fileLocation: req.file.location,
      });
    } catch (error) {
      console.log(error);
      res.status(505).json({ name: "Invalid response" });
    }
  },
};
