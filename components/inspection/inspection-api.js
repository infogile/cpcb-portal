/**
 * Template file for API layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */
var controller = require("./inspection-controller");
var validator = require("./inspection-validator");
const router = require("express").Router();
const helpers = require("../../helper");
const passport = require("passport");

/* GET All Data */
router.get("/", controller.get);

// Get All document/collection count
router.get("/count", controller.count);

// Findone by Id
// router.get('/:id', controller.findOne);

// Create a Inspection
router.post("/", controller.create);

// Update a Inspection
router.put("/:id", controller.update);
router.put("/consent_copy", controller.update);
router.post(
  "/consent_copy",
  helpers.upload.single("consentcopy"),
  controller.uploadFile
);

// Delete a Inspection
router.delete("/:id", controller.delete);
// my status
router.get("/mystatus", controller.myStatus);
// my Inspection
router.get("/myinspection/", controller.myInspection);
router.get(
  "/myactiveinspection/",
  // passport.authenticate("jwt", { session: false }),
  controller.myActiveInspection
);

// my field report
router.get("/myfieldreport/:report_id", controller.myFieldReport);
module.exports = router;
