import type { IBlog } from '../types';
import React from 'react';

interface IBlogItem {
  blog: IBlog;
  showIndex: string[];
  setShowIndex: React.Dispatch<React.SetStateAction<string[]>>;
  handleLike: (id: string, newBlog: any) => void;
  handleDelete: (id: string) => void;
}

export default function BlogItem(props: IBlogItem) {
  return (
    <div className='blogItemWrap'>
      <div>
        <span>title: </span>
        <span className='blogTitle'>{props?.blog?.title}</span>
        <span
          className='showAllBtn'
          onClick={() => {
            if (props?.showIndex?.includes(props?.blog?._id)) {
              props?.setShowIndex((prev: string[]) =>
                prev.filter((item) => item !== props?.blog?._id)
              );
            } else {
              props?.setShowIndex((prev: string[]) => [
                ...prev,
                props?.blog?._id,
              ]);
            }
          }}
        >
          {props?.showIndex?.includes(props?.blog?._id) ? 'hide' : 'view'}
        </span>
      </div>
      <div
        style={{
          display: props?.showIndex?.includes(props?.blog?._id)
            ? 'block'
            : 'none',
        }}
      >
        <div>
          {'url:'}
          {props?.blog?.url}
        </div>
        <div>
          {'likes: '}
          <span className='likesCount'>{props?.blog?.likes}</span>
          <span
            className='likesBtn'
            onClick={() => {
              const updateLikesBlog = {
                ...props?.blog,
                likes: (props?.blog?.likes || 0) + 1,
              };
              props?.handleLike(props?.blog?._id, updateLikesBlog);
            }}
          >
            like
          </span>
        </div>
        <div>
          {'author: '}
          {props?.blog?.author}
        </div>
        {/* Show the button for deleting a blog post only if the blog post was added by the user.  */}
        <div
          className='removeBtn'
          style={{
            display: props?.blog?.showRemoveBtn ? 'block' : 'none',
          }}
          onClick={() => {
            props?.handleDelete(props?.blog?._id);
          }}
        >
          remove
        </div>
      </div>
    </div>
  );
}
