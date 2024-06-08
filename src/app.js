const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGODB_USERNAME?'mongodb://'+process.env.MONGODB_USERNAME+':'+process.env.MONGODB_PASSWORD+'@'+process.env.MONGODB_URI:
    'mongodb://'+process.env.MONGODB_URI
);
// enable cors
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use('/students', studentRoutes);

module.exports = app;
