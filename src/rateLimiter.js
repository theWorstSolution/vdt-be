const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    // HTTP status code to return on exceeding limit (default: 429)
    statusCode: 409,

    // Message to include in the error response (optional)
    message: 'You have exceeded the rate limit. Please try again in 1 minute.',

});

module.exports = rateLimiter