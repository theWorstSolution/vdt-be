const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const cors = require('cors');

const app = express();

console.log('MONGODB_URI'+': '+process.env['MONGODB_URI']);
console.log('MONGODB_USERNAME'+': '+process.env['MONGODB_USERNAME']);
console.log('MONGODB_PASSWORD'+': '+process.env['MONGODB_PASSWORD']);
console.log('PORT'+': '+process.env['PORT']);

const mongoConnectString = process.env.MONGODB_USERNAME?
    'mongodb://'+process.env.MONGODB_USERNAME+':'+process.env.MONGODB_PASSWORD+'@'+process.env.MONGODB_URI+'?authSource=admin':
    'mongodb://'+process.env.MONGODB_URI
console.log(mongoConnectString);
mongoose.connect(mongoConnectString);
// enable cors
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use('/students', studentRoutes);

module.exports = app;
