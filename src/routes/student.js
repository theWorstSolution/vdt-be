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

// List students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;