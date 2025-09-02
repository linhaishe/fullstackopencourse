import mongoose from 'mongoose';
import config from '../utils/config.js';

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB success!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

export default Blog;
