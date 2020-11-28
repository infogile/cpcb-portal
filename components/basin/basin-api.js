/**
 * Template file for API layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */
// var app = require("app");
var controller = require("./basin-controller");
var validator = require("./basin-validator");
const router = require("express").Router();

/* GET All Data */
router.get("/", controller.get);

// Get All document/collection count
router.get("/count", controller.count);

// Findone by Id
router.get("/:id", controller.findOne);

// Create a Basin
router.post("/", controller.create);

// Update a Basin
router.put("/:id", controller.update);

// Delete a Basin
router.delete("/:id", controller.delete);

module.exports = router;
