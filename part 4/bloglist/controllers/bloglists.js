import express from 'express';
import BlogList from '../models/bloglist.js';
const blogListsRouter = express.Router();

// blogListsRouter.get('/', (request, response) => {
//   BlogList.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

blogListsRouter.get('/', async (request, response) => {
  const blogs = await BlogList.find({});
  response.json(blogs);
});

blogListsRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    const blog = new BlogList(body);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

export default blogListsRouter;
