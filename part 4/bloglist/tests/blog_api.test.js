import mongoose from 'mongoose';
import supertest from 'supertest';
import { initialBlogs, blogsInDb, nonExistingId } from './test_helper.js';
import app from '../app.js';
const api = supertest(app);
import BlogList from '../models/bloglist.js';

test('blog posts have id property instead of _id', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;

  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  });
});

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await BlogList.deleteMany({});

    let blogObj = new BlogList(initialBlogs[0]);
    await blogObj.save();

    blogObj = new BlogList(initialBlogs[1]);
    await blogObj.save();
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
});

describe('addition of a new note', () => {
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

  test('blog without title is not added and returns 400', async () => {
    const newBlog = {
      author: 'No Title Author',
      url: 'http://example.com',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('blog without url is not added and returns 400', async () => {
    const newBlog = {
      title: 'Blog without URL',
      author: 'No URL Author',
      likes: 3,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
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
});

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await blogsInDb();
    const noteToView = notesAtStart[0];
    const resultNote = await api
      .get(`/api/blogs/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultNote.body).toStrictEqual(noteToView);
  });

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await blogsInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/blogs/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await blogsInDb();
    const contents = notesAtEnd.map((n) => n.title);
    expect(contents).not.toContain(noteToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// afterAll(() => {
//   mongoose.connection.close();
// });
