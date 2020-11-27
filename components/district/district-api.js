var app = require('app');
var controller = require('./district-controller');
var validator = require('./district-validator');
const router = app.getRouter();

/* GET All Data */
router.get('/', controller.get);

// Get All document/collection count
router.get('/count', controller.count);

// Findone by Id
router.get('/:id', controller.findOne);

// Create a District
router.post('/', controller.create);

// Update a District
router.put('/:id', controller.update);

// Delete a District
router.delete('/:id', controller.delete);

module.exports = router;
