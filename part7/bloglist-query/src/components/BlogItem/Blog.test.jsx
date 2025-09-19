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

test('the blogs URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
  const mockHandler = vi.fn();
  const mockHandler2 = vi.fn();

  render(
    <BlogItem
      blog={blog}
      handleLike={mockHandler}
      setShowIndex={mockHandler2}
    />
  );

  const toggleSpan = screen
    .getAllByText('view')
    .find((el) => el.classList.contains('showAllBtn'));

  const user = userEvent.setup();
  await user.click(toggleSpan);
  const element = screen.getByText(/likes:/i, { hidden: true });
  const element2 = screen.getByText(/url:/i, { hidden: true });
  expect(element).toBeDefined();
  expect(element2).toBeDefined();
});

test('clicking the button calls like event handler twice', async () => {
  const mockHandler = vi.fn();

  render(<BlogItem blog={blog} handleLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
