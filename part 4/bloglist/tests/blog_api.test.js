import mongoose from 'mongoose';
import supertest from 'supertest';
import { initialBlogs } from './test_helper.js';
import app from '../app.js';
const api = supertest(app);
import BlogList from '../models/bloglist.js';

beforeEach(async () => {
  await BlogList.deleteMany({});

  let blogObj = new BlogList(initialBlogs[0]);
  await blogObj.save();

  blogObj = new BlogList(initialBlogs[1]);
  await blogObj.save();
});

test('a valid note can be added', async () => {
  const newBlog = {
    title: 'its new blog test',
    author: 'chenruo',
    url: 'none',
    likes: 11,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain('its new blog test');
});

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two notes', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(2);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].title).toBe('HTML is easy');
});

test('blog posts have id property instead of _id', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;

  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  });
});

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Someone',
    url: 'http://example.com',
    // 注意：没有 likes
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toBe(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});

// afterAll(() => {
//   mongoose.connection.close();
// });
