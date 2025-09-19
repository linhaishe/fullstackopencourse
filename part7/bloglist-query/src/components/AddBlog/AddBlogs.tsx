import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useField } from '../../hooks';
import blogsService from '../../services/blogs';
import { useMsg } from '../../MsgContext';

interface IAddBlogs {
  togglableRef: any;
}

export default function AddBlogs(props: IAddBlogs) {
  const { reset: titleReset, ...titleInput } = useField('text');
  const { reset: authorReset, ...authorInput } = useField('text');
  const { reset: urlReset, ...urlInput } = useField('text');
  const queryClient = useQueryClient();
  const { showMsg } = useMsg();

  const newBlogMutation = useMutation({
    mutationFn: blogsService.create,
    // This in turn causes React Query to automatically update a query with the key notes, i.e. fetch the notes from the server.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showMsg({
        msgContent: 'add succeed',
        isError: false,
      });
    },
    onError: (err: any) => {
      showMsg(err?.response?.data?.error);
    },
  });

  const handleAddBlog = async (newBlogContent: any) => {
    try {
      newBlogMutation.mutate(newBlogContent);
      props?.togglableRef?.current?.toggleVisibility();
    } catch (error) {
      showMsg({
        msgContent: 'wrong credentials',
        isError: true,
      });
    } finally {
      titleReset();
      authorReset();
      urlReset();
    }
  };

  return (
    <div>
      <h3>Create New Blog</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAddBlog({
            title: titleInput.value,
            author: authorInput.value,
            url: urlInput.value,
          });
        }}
      >
        <div>
          <label>
            title:
            <input {...titleInput} />
          </label>
        </div>
        <br />
        <div>
          <label>
            author:
            <input {...authorInput} />
          </label>
        </div>
        <br />
        <div>
          <label>
            url:
            <input {...urlInput} />
          </label>
        </div>
        <br />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
}
