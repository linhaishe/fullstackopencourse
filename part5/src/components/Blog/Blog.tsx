import { useEffect, useRef, useState } from 'react';
import AddBlogs from '../AddBlog/AddBlogs';
import BlogLists from '../BlogLists/BlogLists';
import type { IBlog } from '../types';
import blogsService from '../../services/blogs';
import Togglable from '../Togglable';

export default function Blog(props: any) {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const togglableRef = useRef<any>(null);

  const handleAddBlog = async (newBlogContent: any) => {
    try {
      await blogsService.create(newBlogContent);
      blogsService.getAll().then((initialNotes) => {
        setBlogs(initialNotes);
      });
      props.setMessage({
        type: 'succeed',
        msgContent: 'add succeed',
      });
      togglableRef.current.toggleVisibility();
    } catch (error) {
      props.setMessage({
        type: 'fail',
        msgContent: 'wrong credentials',
      });

      setTimeout(() => {
        props.setMessage({
          type: null,
          msgContent: null,
        });
      }, 5000);
    } finally {
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });
    }
  };

  useEffect(() => {
    blogsService.getAll().then((initialNotes) => {
      setBlogs(initialNotes);
    });
  }, []);

  return (
    <div>
      <BlogLists
        blogs={blogs}
        setMessage={props.setMessage}
        setBlogs={setBlogs}
      />
      <Togglable buttonLabel='add new blog' ref={togglableRef}>
        <AddBlogs
          handleAddBlog={handleAddBlog}
          setNewBlog={setNewBlog}
          newBlog={newBlog}
        />
      </Togglable>
    </div>
  );
}
