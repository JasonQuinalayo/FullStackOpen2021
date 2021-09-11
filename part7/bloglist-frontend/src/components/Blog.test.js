import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';

describe('blog', () => {
  const blog = {
    title: 'Much Title',
    author: 'Doge',
    url: 'wowurl',
    id: '605fd4587ded460625cdaa12',
    likes: 5,
    user: '605fd4587ded460625cdaqw4',
  };
  let component;
  let mockHandler;

  beforeEach(() => {
    mockHandler = jest.fn();
    component = render(
      <Blog blog={blog} handleDelete={() => 1} handleLikeProp={mockHandler} />,
    );
  });

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Much Title Doge',
    );
    const details = document.querySelector('.details');
    expect(details).toHaveStyle('display: none');
  });

  test('shows url and likes when view button is clicked', () => {
    const button = component.getByText('view');
    fireEvent.click(button);
    const details = document.querySelector('.details');
    expect(details).not.toHaveStyle('display: none');
  });

  test('clicking the button twice calls event handler twice', () => {
    fireEvent.click(component.getByText('view'));
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
