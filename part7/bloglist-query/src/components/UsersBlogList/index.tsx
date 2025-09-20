import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import usersService from '../../services/users';

export default function index() {
  const { id } = useParams<{ id: string }>(); // 从路由参数获取 id

  const result = useQuery({
    queryKey: ['UserBlogs', id], // queryKey 带上 id
    queryFn: async ({ queryKey }) => {
      const [, userId] = queryKey; // 解构出 id
      return usersService.getSpecificUser(userId as string);
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

  const userBlogs: any = result.data;

  return (
    <div>
      <h2>{userBlogs?.name || userBlogs?.username}</h2>
      <h3>added blogs</h3>
      {!userBlogs?.blogs?.length ? (
        <div>no blogs</div>
      ) : (
        <ul>
          {userBlogs?.blogs?.map((blog: any, index: number) => {
            return <li key={index}>{blog?.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
