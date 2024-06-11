const winston = require('winston');

// Create a logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: '/var/log/express/error.log', level: 'error' }),
        new winston.transports.File({ filename: '/var/log/express/combined.log' }),
    ]
});

module.exports = logger