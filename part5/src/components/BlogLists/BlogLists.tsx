import type { IBlog } from '../types';

export default function BlogLists(porps: any) {
  return (
    <>
      <h2>blogs</h2>
      {porps?.blogs?.map((blog: IBlog, index) => (
        <div key={index}>
          {blog.title} {blog.author}
        </div>
      ))}
    </>
  );
}
