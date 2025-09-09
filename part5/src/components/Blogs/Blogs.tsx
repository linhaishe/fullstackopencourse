import { useEffect, useState } from 'react';
import blogsService from '../../services/blogs';
import type { IBlog } from '../types';

export default function Blogs(porps: any) {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    blogsService.getAll().then((initialNotes) => {
      setBlogs(initialNotes);
    });
  }, []);

  return (
    <>
      <h2>blogs</h2>
      {blogs.map((blog: IBlog, index) => (
        <div key={index}>
          {blog.title} {blog.author}
        </div>
      ))}
    </>
  );
}
