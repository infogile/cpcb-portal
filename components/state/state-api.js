/**
 * Template file for API layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */
var app = require('app');
var controller = require('./state-controller');
var validator = require('./state-validator');
const router = app.getRouter();

/* GET All Data */
router.get('/', controller.get);

// Get All document/collection count
router.get('/count', controller.count);

// Findone by Id
router.get('/:id', controller.findOne);

// Create a State
router.post('/', controller.create);

// Update a State
router.put('/:id', controller.update);

// Delete a State
router.delete('/:id', controller.delete);

module.exports = router;
