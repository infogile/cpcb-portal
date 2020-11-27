/**
 * Template file for API layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */
var app = require('app');
var controller = require('./sector-controller');
var validator = require('./sector-validator');
const router = app.getRouter();

/* GET All Data */
router.get('/', controller.get);

// Get All document/collection count
router.get('/count', controller.count);

// Findone by Id
router.get('/:id', controller.findOne);

// Create a Sector
router.post('/', controller.create);

// Update a Sector
router.put('/:id', controller.update);

// Delete a Sector
router.delete('/:id', controller.delete);

module.exports = router;
