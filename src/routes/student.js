const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create student
router.post('/', async (req, res) => {
    const student = new Student(req.body);
    try {
      await student.save();
      res.status(201).json(student);
    } catch (err) {
      res.status(400).send(err);
    }
  });

module.exports = router;