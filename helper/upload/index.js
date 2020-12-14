var aws = require("aws-sdk"),
  multer = require("multer"),
  multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.SECRETACCESSKEY,
  accessKeyId: process.env.ACCESSKEYID,
  region: "ap-south-1",
});
var s3 = new aws.S3();

const uploadReport = multer({
  storage: multerS3({
    s3: s3,
    bucket: "cpcbsuraj/reports",
    acl: "public-read",
    cacheControl: "max-age=31536000",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${req.user._id}_${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

module.exports = uploadReport;
