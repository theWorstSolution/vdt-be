const winston = require('winston');

// Create a logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' }) // Log to a file
    ]
});

module.exports = logger