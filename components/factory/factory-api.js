/**
 * Template file for API layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */
var app = require('app');
var controller = require('./factory-controller');
var validator = require('./factory-validator');
const router = app.getRouter();

/* GET All Data */
router.get('/', controller.get);

// Get All document/collection count
router.get('/count', controller.count);

// Findone by Id
router.get('/:id', controller.findOne);

// Create a Factory
router.post('/', controller.create);

// Update a Factory
router.put('/:id', controller.update);

// Delete a Factory
router.delete('/:id', controller.delete);

module.exports = router;
