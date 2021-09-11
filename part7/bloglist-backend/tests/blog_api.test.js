const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const testHelper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

let token;

beforeEach(async () => {
  token = (await api.post('/api/login')
    .send({
      username: 'jason',
      password: 'sonja',
    })).body.token;
  await Blog.deleteMany({});
  const promises = testHelper.initialBlogs
    .map((blog) => api.post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(blog));
  await Promise.all(promises);
});
test('blogs are returned as json', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(blogs.body).toHaveLength(7);
});

test('unique identifier of blogs is \'id\' not \'_id\'', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(blogs.body[0].id).toBeDefined();
});

test('POST request success', async () => {
  const initialBlogs = await testHelper.blogsInDB();
  const blogToAdd = {
    title: 'Rocinante',
    author: 'James Holden',
    url: 'http://leviathan-wakes.com',
    likes: 99,
  };
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const newBlogs = await testHelper.blogsInDB();

  expect(newBlogs.length).toBe(initialBlogs.length + 1);
  expect(newBlogs.map((a) => a.title)).toContain(blogToAdd.title);
});

test('missing likes value defaults to 0', async () => {
  const blogToAdd = {
    title: 'Rocinante',
    author: 'James Holden',
    url: 'http://leviathan-wakes.com',
  };
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const newBlogs = await testHelper.blogsInDB();
  expect(newBlogs.find((blog) => blog.title === 'Rocinante').likes).toBe(0);
});

test('missing title and url responds with status 400', async () => {
  const initialBlogs = await testHelper.blogsInDB();
  const blogToAdd = {
    author: 'James Holden',
  };
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogToAdd)
    .expect(400);
  const newBlogs = await testHelper.blogsInDB();
  expect(initialBlogs.length === newBlogs.length);
});

test('deleting a blog post works', async () => {
  const blogToBeDeleted = (await testHelper.blogsInDB())[0];
  await api.delete(`/api/blogs/${blogToBeDeleted.id}`)
    .set('Authorization', `Bearer ${token}`);
  const newBlogs = await testHelper.blogsInDB();
  expect(newBlogs.map((a) => a.id)).not.toContain(blogToBeDeleted.id);
});

test('updating a blog post works', async () => {
  const blogToBeUpdated = (await testHelper.blogsInDB())[0];
  await api.put(`/api/blogs/${blogToBeUpdated.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      likes: blogToBeUpdated.likes + 1,
    });
  const newBlogs = await testHelper.blogsInDB();
  expect(newBlogs.find((a) => a.id === blogToBeUpdated.id).likes)
    .toBe(blogToBeUpdated.likes + 1);
});

afterAll(() => {
  mongoose.connection.close();
});
