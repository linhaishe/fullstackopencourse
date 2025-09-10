import type { IBlog } from '../types';

export default function BlogLists(porps: any) {
  return (
    <>
      <h2>blogs</h2>
      {porps?.blogs?.map((blog: IBlog, index: number) => (
        <div key={index}>
          {`${index + 1}. `}
          {blog.title} {blog.author}
        </div>
      ))}
    </>
  );
}
