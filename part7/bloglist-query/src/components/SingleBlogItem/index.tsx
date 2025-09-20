import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import blogsService from '../../services/blogs';
import { LikesBtn } from '../BlogItem';

export default function index() {
  const { id } = useParams<{ id: string }>();

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

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>server break~</div>;
  }

  const blog: any = result.data;

  console.log('blog', blog);

  return (
    <div>
      <div>title: {blog?.title}</div>
      <div>url: {blog?.url}</div>
      <span>likes: {blog?.likes}</span>
      <LikesBtn blogsItem={blog} />
    </div>
  );
}
