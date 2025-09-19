import { useEffect, useRef, useState } from 'react';
import AddBlogs from '../AddBlog/AddBlogs';
import BlogLists from '../BlogLists/BlogLists';
import type { IBlog } from '../types';
import blogsService from '../../services/blogs';
import Togglable from '../Togglable';
import { useMsg } from '../../MsgContext';

export default function Blog() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const togglableRef = useRef<any>(null);
  const { showMsg } = useMsg();

  const handleAddBlog = async (newBlogContent: any) => {
    try {
      await blogsService.create(newBlogContent);
      blogsService.getAll().then((initialNotes) => {
        setBlogs(initialNotes);
      });
      showMsg({
        msgContent: 'add succeed',
        isError: false,
      });
      togglableRef.current.toggleVisibility();
    } catch (error) {
      showMsg({
        msgContent: 'wrong credentials',
        isError: true,
      });
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
        // setMessage={props.setMessage}
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
