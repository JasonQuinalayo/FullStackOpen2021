const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const testHelper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(testHelper.initialUsers);
});

describe('do not create user if', async () => {
  test('invalid username', async () => {
    const initialUsers = await testHelper.usersInDB();
    await api.post('/api/users')
      .send({
        name: 'nosaj',
        username: 'ja',
        password: 'ckret',
        notes: [],
      })
      .expect(400);
    const postUsers = await testHelper.usersInDB();
    expect(initialUsers.length === postUsers.length);
  });
  test('invalid password', async () => {
    const initialUsers = await testHelper.usersInDB();
    await api.post('/api/users')
      .send({
        name: 'nosaj',
        username: 'jason',
        password: 'ck',
        notes: [],
      })
      .expect(400);
    const postUsers = await testHelper.usersInDB();
    expect(initialUsers.length === postUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
