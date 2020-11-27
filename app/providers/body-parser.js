var bp = require('body-parser');

class BodyParser {
    constructor(express) {
        this.express = express;
    }

    register() {
        this.express.use(bp.json());
        this.express.use(
            bp.urlencoded({
                extended: true,
            }),
        );
    }
}

module.exports = BodyParser;
