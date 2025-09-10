import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogItem from './index';

const blog = {
  url: 'urlTest',
  title: 'Component testing is done with react-testing-library',
  author: 'CR',
  showRemoveBtn: true,
};

test('renders content', () => {
  render(<BlogItem blog={blog} />);

  // screen.debug();

  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(element).toBeDefined();
});

test('clicking the button calls event handler once', async () => {
  const mockHandler = vi.fn();

  render(<BlogItem blog={blog} handleLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
