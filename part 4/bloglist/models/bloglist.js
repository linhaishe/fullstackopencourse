import mongoose from 'mongoose';
import config from '../utils/config.js';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

// 处理mongodb _id _v的数据格式，统一内容
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
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
