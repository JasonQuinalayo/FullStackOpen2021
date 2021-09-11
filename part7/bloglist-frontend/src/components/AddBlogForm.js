import React, { useState } from 'react';
import { addBlog } from '../reducers/blogListReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const AddBlogForm = ({ togglableRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch()
  const username = useSelector(state=>state.user.name)

  const handleAddBlog = async (event) => {
    event.preventDefault();
    dispatch(addBlog({ title, author, url }, togglableRef, username));
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
      <Button size="sm" type="submit">add</Button>
    </form>
  );
};

export default AddBlogForm;
