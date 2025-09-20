import { Link } from 'react-router-dom';
import type { IBlog } from '../types';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogsService from '../../services/blogs';
import { useMsg } from '../../context/MsgContext';

interface IBlogItem {
  blog: IBlog;
  showIndex: string[];
  setShowIndex: React.Dispatch<React.SetStateAction<string[]>>;
  handleDelete: (id: string) => void;
}

export const LikesBtn = ({ blogsItem }: { blogsItem: any }) => {
  const queryClient = useQueryClient();
  const { showMsg } = useMsg();

  const likeMutation = useMutation({
    mutationFn: ({ id, newObject }: { id: string; newObject: IBlog }) =>
      blogsService.update(id, newObject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      // todo: 待优化/token问题
      queryClient.invalidateQueries({ queryKey: ['singleBlog'] });
      showMsg({
        msgContent: 'likes succeed',
        isError: false,
      });
    },
    onError: (err: any) => {
      showMsg({
        msgContent: err?.response?.data?.error,
        isError: true,
      });
    },
  });

  const handleLike = async (id: string, newBlogContent: any) => {
    try {
      likeMutation.mutate({ id, newObject: newBlogContent });
    } catch (error) {
      showMsg({
        msgContent: 'wrong credentials',
        isError: true,
      });
    }
  };
  return (
    <span
      className='likesBtn'
      onClick={() => {
        const updateLikesBlog = {
          ...blogsItem,
          likes: (blogsItem?.likes || 0) + 1,
        };
        handleLike(blogsItem?._id || blogsItem?.id, updateLikesBlog);
      }}
    >
      like
    </span>
  );
};

export default function BlogItem(props: IBlogItem) {
  return (
    <div className='blogItemWrap'>
      <div>
        <span>title: </span>
        <Link to={`/blogs/${props?.blog?._id}`} state={{ blog: props?.blog }}>
          <span className='blogTitle'>{props?.blog?.title}</span>
        </Link>
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
          {/* <span
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
          </span> */}
          <LikesBtn blogsItem={props?.blog} />
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
