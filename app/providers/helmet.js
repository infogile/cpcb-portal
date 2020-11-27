var helmet = require('helmet');

class Helmet {
    constructor(express) {
        this.express = express;
    }
    register() {
        this.express.use(helmet());
    }
}

module.exports = Helmet;
