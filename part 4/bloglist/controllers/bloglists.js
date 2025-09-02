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

blogListsRouter.post('/', (request, response) => {
  const blog = new BlogList(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

export default blogListsRouter;
