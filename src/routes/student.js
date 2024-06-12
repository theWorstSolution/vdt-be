const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const logger = require('../logger');
const authRequire = require('../auth/authMiddleware');

// Create student
router.post('/', authRequire, async (req, res) => {
  // logger.info('Create student requested');
    if(req.auth.role=='user'){
      res.status(403).send();
      return
    }
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
  // logger.info('List students requested');
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get student by ID
router.get('/:id', authRequire, async (req, res) => {
  // logger.info('Get student by ID requested');
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
router.patch('/:id', authRequire, async (req, res) => {
  // logger.info('Update student requested');
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
router.delete('/:id', authRequire, async (req, res) => {
  // logger.info('Delete student requested');
  if(req.auth.role=='user'){
    res.status(403).send();
    return
  }
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