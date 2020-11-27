// // import Logger from 'src/logger';
// const Logger = require('Logger');
// // type ErrorTypes =
// //     | 'api_connection_error'
// //     | 'api_error'
// //     | 'authentication_error'
// //     | 'invalid_request_error'
// //     | 'rate_limit_error'
// //     | 'validation_error'
// //     | string;
// class ErrorHandler extends Error {
//     constructor(statusCode, message, errorType, oerror) {
//         super();
//         this.statusCode = statusCode;
//         this.message = message;
//         this.errorType = errorType;
//         // Logger.error(oerror);
//     }
// }

// module.exports = ErrorHandler;
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
module.exports = ErrorHandler;
