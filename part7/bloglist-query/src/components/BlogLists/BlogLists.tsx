import { useState, type Dispatch, type SetStateAction } from 'react';
import type { IBlog } from '../types';
import './BlogLists.css';
import blogsService from '../../services/blogs';
import BlogItem from '../BlogItem';
import { useMsg } from '../../MsgContext';

interface IBlogListsProps {
  setBlogs: Dispatch<SetStateAction<IBlog[]>>;
  blogs: IBlog[];
}

export default function BlogLists(props: IBlogListsProps) {
  const [showIndex, setShowIndex] = useState<string[]>([]);
  const { showMsg } = useMsg();

  const handleLike = async (id: string, newBlogContent: any) => {
    try {
      await blogsService.update(id, newBlogContent);
      blogsService.getAll().then((initialNotes) => {
        props.setBlogs(initialNotes);
      });
      showMsg({
        msgContent: 'likes succeed',
        isError: false,
      });
    } catch (error) {
      showMsg({
        msgContent: 'wrong credentials',
        isError: true,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm('Do you want to remove it?')) {
        await blogsService.deleteBlog(id);
        blogsService.getAll().then((initialNotes) => {
          props.setBlogs(initialNotes);
        });
        showMsg({
          msgContent: 'delete succeed',
          isError: false,
        });
      }
    } catch (error) {
      showMsg({
        msgContent: 'wrong credentials',
        isError: true,
      });
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
