const winston = require('winston');
const transports = [];
if (process.env.NODE_ENV !== 'development') {
    transports.push(new winston.transports.Console());
} else {
    transports.push(
        new winston.transports.File({
            format: winston.format.combine(winston.format.cli(), winston.format.splat()),
            filename: 'app.log',
        }),
    );
}

const LoggerInstance = winston.createLogger({
    level: process.env.LOG_LEVEL,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports,
});

module.exports = LoggerInstance;
