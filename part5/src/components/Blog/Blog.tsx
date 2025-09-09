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
      props.setMessage({
        type: 'succeed',
        msgContent: 'add succeed',
      });
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });
    } catch (error) {
      props.setMessage({
        type: 'fail',
        msgContent: 'wrong credentials',
      });

      props.setTimeout(() => {
        props.setErrorMsg({
          type: null,
          msgContent: null,
        });
      }, 5000);
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
