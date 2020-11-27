// const handleError = (err, res) => {
//     const { statusCode, message } = err;
//     res.status(statusCode).json({
//         status: 'error',
//         statusCode,
//         message,
//     });
// };

// class HandleError {
//     constructor(express) {
//         this.express = express;
//     }
//     register() {
//         this.express.use((err, req, res, next) => {
//             handleError(err, res);
//         });
//     }
// }

// module.exports = HandleError;
