import express from 'express';
import BlogList from '../models/bloglist.js';
import User from '../models/user.js';
const blogListsRouter = express.Router();

// blogListsRouter.get('/', (request, response) => {
//   BlogList.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

blogListsRouter.get('/', async (request, response) => {
  const blogs = await BlogList.find({}).populate('user');
  response.json(blogs);
});

blogListsRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    console.log('body', body);
    const user = await User.findById(body.userId);
    console.log('user', user);

    const blog = new BlogList({ ...body, user: user._id });
    const savedBlog = await blog.save();
    console.log('savedBlog', savedBlog);

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

blogListsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await BlogList.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    // 这里捕获无效的 ObjectId
    response.status(400).send({ error: 'malformatted id' });
  }
});

blogListsRouter.delete('/:id', (request, response, next) => {
  BlogList.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

blogListsRouter.put('/:id', (request, response, next) => {
  const { title, url } = request.body;

  BlogList.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.title = title;
      note.url = url;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

export default blogListsRouter;
