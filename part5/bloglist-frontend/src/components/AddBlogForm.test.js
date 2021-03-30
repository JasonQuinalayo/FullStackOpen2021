import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import AddBlogForm from './AddBlogForm';

test('add blog', () => {
  const mockHandler = jest.fn();

  const component = render(
    <AddBlogForm addBlog={mockHandler} />,
  );

  fireEvent.change(component.container.querySelector('#title'), {
    target: { value: 'titletest' },
  });
  fireEvent.change(component.container.querySelector('#author'), {
    target: { value: 'authortest' },
  });
  fireEvent.change(component.container.querySelector('#url'), {
    target: { value: 'urltest' },
  });
  fireEvent.submit(component.container.querySelector('form'));

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0]).toEqual({
    title: 'titletest',
    author: 'authortest',
    url: 'urltest',
  });
});
