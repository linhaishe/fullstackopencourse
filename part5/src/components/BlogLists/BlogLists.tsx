import { useState } from 'react';
import type { IBlog } from '../types';
import './BlogLists.css';

export default function BlogLists(porps: any) {
  const [showIndex, setShowIndex] = useState<number[]>([]);

  return (
    <div className='blogListWrap'>
      <h2>blogs</h2>
      {porps?.blogs?.map((blog: IBlog, index: number) => (
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
              <span className='likesBtn'>like</span>
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
