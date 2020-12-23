/**
 * Template file for API layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */
var app = require("app");
var controller = require("./inspection-controller");
var validator = require("./inspection-validator");
const router = app.getRouter();
const helpers = require("../../helper");

/* GET All Data */
router.get("/", controller.get);

// all Inspection
router.get("/allinspection", controller.allInspection);

// Get All document/collection count
router.get("/count", controller.count);

// Findone by Id
// router.get('/:id', controller.findOne);

// Create a Inspection
router.post("/", controller.create);

router.get("/getinspectionreport/:id", controller.getInpsectionReport);
// Update a Inspection
router.put("/:id", controller.update);
router.put("/test-upload", controller.update);

// Delete a Inspection
router.delete("/:id", controller.delete);
// my status
router.get("/mystatus", controller.myStatus);
//all inspection grouped by status
router.get(
  "/allinspections_grouped_by_status",
  controller.allInspectionsGroupedByStatus
);
// my Inspection
router.post("/myinspection", controller.myInspection);
// my active inspection
router.post("/myactiveinspection", controller.myActiveInspection);
//all my active inspection
router.post("/myallinspection", controller.myAllInspection);
//get field report
router.get("/getfieldreport/:report_id", controller.getFieldReport);
//get completed inspections for a state(spcb)
router.get("/mycompletedinspections", controller.myCompletedInspections);
// my field report
router.post("/myfieldReport", controller.myFieldReport);
//upload consent copy
router.post(
  "/consentcopy",
  helpers.uploadReport.single("consentcopy"),
  controller.uploadReport
);
//upload inspection report
router.post(
  "/inspectionreport",
  helpers.uploadReport.single("inspectionreport"),
  controller.uploadReport
);
//upload air consent
router.post(
  "/airconsent",
  helpers.uploadReport.single("airconsent"),
  controller.uploadReport
);
//upload water consent
router.post(
  "/waterconsent",
  helpers.uploadReport.single("waterconsent"),
  controller.uploadReport
);
//upload cgwa noc
router.post(
  "/cgwaNoc",
  helpers.uploadReport.single("cgwaNoc"),
  controller.uploadReport
);
//upload hazardous consent
router.post(
  "/hazardousconsent",
  helpers.uploadReport.single("hazardousconsent"),
  controller.uploadReport
);
//upload action report
router.post(
  "/actionreport",
  helpers.uploadReport.single("actionreport"),
  controller.uploadReport
);
module.exports = router;
