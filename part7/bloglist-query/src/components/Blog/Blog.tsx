import { useRef } from 'react';
import AddBlogs from '../AddBlog/AddBlogs';
import BlogLists from '../BlogLists/BlogLists';
import type { IBlog } from '../types';
import Togglable from '../Togglable';
interface IBlogProps {
  blogsList: IBlog[];
}

export default function Blog(props: IBlogProps) {
  const togglableRef = useRef<any>(null);

  return (
    <div>
      <BlogLists blogs={props?.blogsList || []} />
      <Togglable buttonLabel='add new blog' ref={togglableRef}>
        <AddBlogs togglableRef={togglableRef} />
      </Togglable>
    </div>
  );
}
