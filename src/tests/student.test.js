const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Student = require('../src/models/student');

beforeAll(async () => {
  const url = 'mongodb://127.0.0.1:27017/vdt2024_test';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Student.deleteMany();
});

// test('should create a new student', async () => {
//   const newStudent = { name: 'John Doe', gender: 'Male', school: 'XYZ University' };
//   const res = await request(app)
//     .post('/students')
//     .send(newStudent)
//     .expect(201);
//   expect(res.body).toHaveProperty('id');
//   expect(res.body.name).toBe(newStudent.name);
// });

// Các test cases khác
