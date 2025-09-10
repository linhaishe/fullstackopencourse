import { useState } from 'react'
import type { IBlog } from '../types'
import './BlogLists.css'
import blogsService from '../../services/blogs'

export default function BlogLists(props: any) {
  const [showIndex, setShowIndex] = useState<string[]>([])

  const handleLike = async (id: string, newBlogContent: any) => {
    try {
      await blogsService.update(id, newBlogContent)
      blogsService.getAll().then((initialNotes) => {
        props.setBlogs(initialNotes)
      })
      props.setMessage({
        type: 'succeed',
        msgContent: 'likes succeed',
      })
    } catch (error) {
      props.setMessage({
        type: 'fail',
        msgContent: 'wrong credentials',
      })

      props.setTimeout(() => {
        props.setErrorMsg({
          type: null,
          msgContent: null,
        })
      }, 5000)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm('Do you want to remove it?')) {
        await blogsService.deleteBlog(id)
        blogsService.getAll().then((initialNotes) => {
          props.setBlogs(initialNotes)
        })
        props.setMessage({
          type: 'succeed',
          msgContent: 'delete succeed',
        })
      }
    } catch (error) {
      props.setMessage({
        type: 'fail',
        msgContent: 'wrong credentials',
      })

      props.setTimeout(() => {
        props.setErrorMsg({
          type: null,
          msgContent: null,
        })
      }, 5000)
    }
  }

  return (
    <div className='blogListWrap'>
      <h2>blogs</h2>
      {props?.blogs
        ?.sort((a: IBlog, b: IBlog) => (b.likes ?? 0) - (a.likes ?? 0))
        .map((blog: IBlog) => (
          <div key={blog._id} className='blogListItemWrap'>
            <div>
              <span>title: </span>
              <span>{blog.title}</span>
              <span
                className='showAllBtn'
                onClick={() => {
                  if (showIndex?.includes(blog._id)) {
                    setShowIndex((prev) =>
                      prev.filter((item) => item !== blog._id)
                    )
                  } else {
                    setShowIndex((prev) => [...prev, blog._id])
                  }
                }}
              >
                {showIndex?.includes(blog._id) ? 'hide' : 'view'}
              </span>
            </div>
            <div
              style={{
                display: showIndex?.includes(blog._id) ? 'block' : 'none',
              }}
            >
              <div>
                {'url: '}
                {blog.url}
              </div>
              <div>
                {'likes: '}
                {blog.likes}
                <span
                  className='likesBtn'
                  onClick={() => {
                    const updateLikesBlog = {
                      ...blog,
                      likes: (blog?.likes || 0) + 1,
                    }
                    handleLike(blog?._id, updateLikesBlog)
                  }}
                >
                  like
                </span>
              </div>
              <div>
                {'author: '}
                {blog.author}
              </div>
              {/* Show the button for deleting a blog post only if the blog post was added by the user.  */}
              <div
                className='removeBtn'
                style={{
                  display: blog?.showRemoveBtn ? 'block' : 'none',
                }}
                onClick={() => {
                  handleDelete(blog?._id)
                }}
              >
                remove
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
