const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.NODE_ENV=='test'?'mongodb://localhost:27017/vdt2024-test':'mongodb://localhost:27017/vdt2024');
// enable cors
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use('/students', studentRoutes);

module.exports = app;
