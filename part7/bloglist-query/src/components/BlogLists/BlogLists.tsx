import { useState } from 'react';
import type { IBlog } from '../types';
import './BlogLists.css';
import blogsService from '../../services/blogs';
import BlogItem from '../BlogItem';
import { useMsg } from '../../context/MsgContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IBlogListsProps {
  blogs: IBlog[];
}

export default function BlogLists(props: IBlogListsProps) {
  const [showIndex, setShowIndex] = useState<string[]>([]);
  const { showMsg } = useMsg();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => blogsService.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showMsg({
        msgContent: 'delete succeed',
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

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm('Do you want to remove it?')) {
        deleteMutation.mutate({ id });
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
              handleDelete={handleDelete}
            />
          </div>
        ))}
    </div>
  );
}
