import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleDelete, handleLike }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const detailsVisibility = { display: viewDetails ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div className="blog" style={blogStyle}>
      {blog.title}
      {' '}
      {blog.author}
      <button type="button" className="view-blog-details-button" onClick={() => setViewDetails(!viewDetails)}>{viewDetails ? 'hide' : 'view'}</button>
      <div className="blog-details" style={detailsVisibility}>
        {blog.url}
        <br />
        likes:
        {' '}
        {blog.likes}
        {' '}
        <button type="button" className="like-button" onClick={handleLike}>like</button>
        <br />
        {blog.user.name}
        <br />
        <button type="button" className="delete-blog-button" onClick={handleDelete(blog)}>delete</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
