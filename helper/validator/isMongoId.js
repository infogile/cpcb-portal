var Validator = require('validator');
var isEmpty = require('./isEmpty');

const isMongoId = id => {
    const checkId = !isEmpty(id) ? id : '';
    return Validator.isMongoId(id);
};

module.exports = isMongoId;
