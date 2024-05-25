const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Student = require('../src/models/student');

// beforeAll(async () => {
//   const url = 'mongodb://127.0.0.1:27017/vdt2024_test';
//   await mongoose.connect(url);
// });

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Student.deleteMany();
});

test('should create a new student', async () => {
  const newStudent = { name: 'John Doe', gender: 'Male', school: 'XYZ University' };
  const res = await request(app)
    .post('/students')
    .send(newStudent)
    .expect(201);
  expect(res.body).toHaveProperty('_id');
  expect(res.body.name).toBe(newStudent.name);
});

// Test to get all students
test('should get all students', async () => {
  const student1 = new Student({ name: 'John Doe', gender: 'Male', school: 'XYZ University' });
  const student2 = new Student({ name: 'Jane Doe', gender: 'Female', school: 'ABC University' });
  await student1.save();
  await student2.save();

  const res = await request(app)
    .get('/students')
    .expect(200);
  expect(res.body.length).toBe(2);
  expect(res.body[0].name).toBe(student1.name);
  expect(res.body[1].name).toBe(student2.name);
});

// Test to get a student by ID
test('should get a student by id', async () => {
  const student = new Student({ name: 'Jane Doe', gender: 'Female', school: 'ABC University' });
  await student.save();

  const res = await request(app)
    .get(`/students/${student._id}`)
    .expect(200);
  expect(res.body).toHaveProperty('_id');
  expect(res.body.name).toBe(student.name);
});
