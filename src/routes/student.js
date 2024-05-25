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

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send();
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).send(err);
  }
});


// Update student
router.patch('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) {
      return res.status(404).send();
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send();
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;