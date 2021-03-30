import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleAddBlog = async (event) => {
    event.preventDefault();
    await addBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <form onSubmit={handleAddBlog}>
      <h3>Add new blog</h3>
      <span>Title: </span>
      <input
        id="title"
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <span>Author: </span>
      <input
        id="author"
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      <span>URL: </span>
      <input
        id="url"
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button id="submit-blog" type="submit">add</button>
    </form>
  );
};

AddBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default AddBlogForm;
