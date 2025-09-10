import { render, screen } from '@testing-library/react';
import BlogItem from './index';

test('renders content', () => {
  const blog = {
    url: 'urlTest',
    title: 'Component testing is done with react-testing-library',
    author: 'CR',
  };

  render(<BlogItem blog={blog} />);

  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(element).toBeDefined();
});
