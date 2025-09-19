import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddBlogs from './AddBlogs';
import { useState } from 'react';

function Wrapper({ handleAddBlog }) {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  return (
    <AddBlogs
      newBlog={newBlog}
      setNewBlog={setNewBlog}
      handleAddBlog={handleAddBlog}
    />
  );
}

test('<AddBlogs /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<Wrapper handleAddBlog={createBlog} />);

  const titleInput = screen.getByLabelText(/title/i);
  const createButton = screen.getByText('Create');

  await user.type(titleInput, 'testing a form...');
  await user.click(createButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...');
});
