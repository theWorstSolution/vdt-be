const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');

const app = express();

mongoose.connect('mongodb://localhost:27017/vdt2024');

app.use(bodyParser.json());
app.use('/students', studentRoutes);

module.exports = app;
