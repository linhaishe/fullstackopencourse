export default function AddBlogs(props: any) {
  return (
    <div>
      <h3>Create New Blog</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.handleAddBlog(props.newBlog);
        }}
      >
        <div>
          <label>
            title:
            <input
              type='text'
              value={props?.newBlog?.title}
              onChange={({ target }) =>
                props.setNewBlog((prev: any) => ({
                  ...prev,
                  title: target.value,
                }))
              }
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            author:
            <input
              type='text'
              value={props?.newBlog?.author}
              onChange={({ target }) =>
                props.setNewBlog((prev: any) => ({
                  ...prev,
                  author: target.value,
                }))
              }
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            url:
            <input
              type='text'
              value={props?.newBlog?.url}
              onChange={({ target }) =>
                props.setNewBlog((prev: any) => ({
                  ...prev,
                  url: target.value,
                }))
              }
            />
          </label>
        </div>
        <br />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
}
