const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const cors = require('cors');
const logger = require('./logger')
const promClient = require('prom-client');

const app = express();
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

// Custom metrics example
const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [50, 100, 200, 300, 400, 500, 600, 800, 1000],
});

console.log('MONGODB_URI' + ': ' + process.env['MONGODB_URI']);
console.log('MONGODB_USERNAME' + ': ' + process.env['MONGODB_USERNAME']);
console.log('MONGODB_PASSWORD' + ': ' + process.env['MONGODB_PASSWORD']);
console.log('PORT' + ': ' + process.env['PORT']);

const mongoConnectString = process.env.MONGODB_USERNAME ?
    'mongodb://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@' + process.env.MONGODB_URI + '?authSource=admin' :
    'mongodb://' + process.env.MONGODB_URI

// const mongoConnectString = 'mongodb://' + process.env.MONGODB_URI
console.log(mongoConnectString);
mongoose.connect(mongoConnectString);
// enable cors
app.use(cors());

// Log requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url} ${res.statusCode}`);
    next();
});

app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
        const route = req.route && req.route.path ? req.route.path : req.originalUrl;
        end({ method: req.method, route: route, code: res.statusCode });
    });
    next();
});




app.options('*', cors());

app.use(bodyParser.json());

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});
app.use('/students', studentRoutes);


module.exports = app;
