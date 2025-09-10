import { useState } from 'react';
import type { IBlog } from '../types';
import './BlogLists.css';
import blogsService from '../../services/blogs';
import type { TMessage } from '../Msg/Msg';
import BlogItem from '../BlogItem';

interface IBlogListsProps {
  setBlogs: (blog: IBlog) => void;
  setMessage: (msg: TMessage) => void;
  blogs: IBlog[];
}

export default function BlogLists(props: IBlogListsProps) {
  const [showIndex, setShowIndex] = useState<string[]>([]);

  const handleLike = async (id: string, newBlogContent: any) => {
    try {
      await blogsService.update(id, newBlogContent);
      blogsService.getAll().then((initialNotes) => {
        props.setBlogs(initialNotes);
      });
      props.setMessage({
        type: 'succeed',
        msgContent: 'likes succeed',
      });
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
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm('Do you want to remove it?')) {
        await blogsService.deleteBlog(id);
        blogsService.getAll().then((initialNotes) => {
          props.setBlogs(initialNotes);
        });
        props.setMessage({
          type: 'succeed',
          msgContent: 'delete succeed',
        });
      }
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
    }
  };

  return (
    <div className='blogListWrap'>
      <h2>blogs</h2>
      {props?.blogs
        ?.sort((a: IBlog, b: IBlog) => (b.likes ?? 0) - (a.likes ?? 0))
        .map((blog: IBlog) => (
          <div key={blog._id} className='blogListItemWrap'>
            <BlogItem
              blog={blog}
              showIndex={showIndex}
              setShowIndex={setShowIndex}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          </div>
        ))}
    </div>
  );
}
