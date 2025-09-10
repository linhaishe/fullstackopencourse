import { useState } from 'react';
import type { IBlog } from '../types';
import './BlogLists.css';
import blogsService from '../../services/blogs';

export default function BlogLists(props: any) {
  const [showIndex, setShowIndex] = useState<number[]>([]);

  const handleLike = async (id: string, newBlogContent: any) => {
    try {
      console.log('newBlogContent', newBlogContent);
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

      props.setTimeout(() => {
        props.setErrorMsg({
          type: null,
          msgContent: null,
        });
      }, 5000);
    }
  };

  return (
    <div className='blogListWrap'>
      <h2>blogs</h2>
      {props?.blogs?.map((blog: IBlog, index: number) => (
        <div key={index} className='blogListItemWrap'>
          {/* <div>{`${index + 1}. `}</div> */}
          <div>
            <span>title: </span>
            <span>{blog.title}</span>
            <span
              className='showAllBtn'
              onClick={() => {
                if (showIndex?.includes(index)) {
                  setShowIndex((prev) => prev.filter((item) => item !== index));
                } else {
                  setShowIndex((prev) => [...prev, index]);
                }
              }}
            >
              {showIndex?.includes(index) ? 'hide' : 'view'}
            </span>
          </div>
          <div
            style={{
              display: showIndex?.includes(index) ? 'block' : 'none',
            }}
          >
            <div>
              {'url: '}
              {blog.url}
            </div>
            <div>
              {'likes: '}
              {blog.likes}
              <span
                className='likesBtn'
                onClick={() => {
                  const updateLikesBlog = {
                    ...blog,
                    likes: (blog?.likes || 0) + 1,
                  };
                  handleLike(blog?.id, updateLikesBlog);
                }}
              >
                like
              </span>
            </div>
            <div>
              {'author: '}
              {blog.author}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
