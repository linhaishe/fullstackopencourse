import { useEffect, useRef } from 'react';
import AddBlogs from '../AddBlog/AddBlogs';
import BlogLists from '../BlogLists/BlogLists';
import Togglable from '../Togglable';
import { useQuery } from '@tanstack/react-query';
import blogsService from '../../services/blogs';

interface IBlogProps {
  setUser: any;
}

export default function Blog(props: IBlogProps) {
  const togglableRef = useRef<any>(null);
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogsService.getAll(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      props.setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>server break~</div>;
  }

  const blogsList = result.data;
  return (
    <div>
      <BlogLists blogs={blogsList || []} />
      <Togglable buttonLabel='add new blog' ref={togglableRef}>
        <AddBlogs togglableRef={togglableRef} />
      </Togglable>
    </div>
  );
}
