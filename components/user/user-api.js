/**
 * Template file for API layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */
var app = require('app');
var controller = require('./user-controller');
var validator = require('./user-validator');
const router = app.getRouter();

/* GET All Data */
router.get('/', controller.get);

// Get All document/collection count
router.get('/count', controller.count);

// Findone by Id
router.get('/:id', controller.findOne);

// Create a User
router.post('/', controller.create);

// Update a User
router.put('/:id', controller.update);

// Delete a User
router.delete('/:id', controller.delete);

module.exports = router;
