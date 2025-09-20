import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import blogsService from '../../services/blogs';
import { LikesBtn } from '../BlogItem';
import { useField } from '../../hooks';
import { useMsg } from '../../context/MsgContext';

export default function index() {
  const { id } = useParams<{ id: string }>();
  const { reset: commentInputReset, ...commentInput } = useField('text');
  const { showMsg } = useMsg();
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['singleBlog', id],
    queryFn: async ({ queryKey }) => {
      const [, blogId] = queryKey;
      return blogsService.getBlog(blogId as string);
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id, // 确保 id 存在时才请求
  });

  const newCommentMutation = useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      blogsService.addComment(id, comment),
    // This in turn causes React Query o automatically update a query with the key notes, i.e. fetch the notes from the server.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['singleBlog'] });
      showMsg({
        msgContent: 'add comment succeed',
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

  const handleAddComment = (id: string, comment: string) => {
    newCommentMutation.mutate({ id, comment });
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>server break~</div>;
  }

  const blog: any = result.data;

  return (
    <div>
      <h2>{blog?.title}</h2>
      <div>url: {blog?.url}</div>
      <span>likes: {blog?.likes}</span>
      <LikesBtn blogsItem={blog} />
      <div>add by {blog?.user?.name || 'no name'}</div>
      <h2>Comments</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            handleAddComment(id, commentInput.value);
          }
        }}
      >
        <input {...commentInput}></input>
        <button>add comment</button>
      </form>
      <ul>
        {blog?.comments?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <li>{item?.comment}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
