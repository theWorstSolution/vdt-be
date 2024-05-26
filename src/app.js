const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.NODE_ENV=='test'?process.env.MONGODB_URI+'-test':process.env.MONGODB_URI);
// enable cors
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use('/students', studentRoutes);

module.exports = app;
