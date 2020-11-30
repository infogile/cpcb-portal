/**
 * Template file for API layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */
var app = require('app');
var controller = require('./inspection-controller');
var validator = require('./inspection-validator');
const router = app.getRouter();

/* GET All Data */
router.get('/', controller.get);

// Get All document/collection count
router.get('/count', controller.count);

// Findone by Id
// router.get('/:id', controller.findOne);

// Create a Inspection
router.post('/', controller.create);

// Update a Inspection
router.put('/:id', controller.update);
router.put('/test-upload', controller.update);

// Delete a Inspection
router.delete('/:id', controller.delete);
// my status
router.get('/mystatus', controller.myStatus);
// my Inspection
router.post('/myinspection', controller.myInspection);
// my active inspection
router.post("/myactiveinspection", controller.myActiveInspection);
//all my active inspection
router.post("/myallinspection", controller.myAllInspection);
//get field report
router.get("/getfieldreport/:report_id", controller.getFieldReport);
// my field report
router.post('/myfieldReport', controller.myFieldReport);
module.exports = router;
