import { useEffect, useState } from 'react';
import AddBlogs from '../AddBlog/AddBlogs';
import BlogLists from '../BlogLists/BlogLists';
import type { IBlog } from '../types';
import blogsService from '../../services/blogs';

export default function Blog(props: any) {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleAddBlog = async (newBlogContent: any) => {
    try {
      console.log('newBlogContent', newBlogContent);
      await blogsService.create(newBlogContent);
      blogsService.getAll().then((initialNotes) => {
        setBlogs(initialNotes);
      });
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });
    } catch (error) {
      //   setErrorMsg('wrong credentials');
      //   setTimeout(() => {
      //     setErrorMsg(null);
      //   }, 5000);
    }
  };

  useEffect(() => {
    blogsService.getAll().then((initialNotes) => {
      setBlogs(initialNotes);
    });
  }, []);

  return (
    <div>
      <BlogLists blogs={blogs} />
      <AddBlogs
        handleAddBlog={handleAddBlog}
        setNewBlog={setNewBlog}
        newBlog={newBlog}
      />
    </div>
  );
}
