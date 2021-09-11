import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { likeBlog, deleteBlog, addComment } from '../reducers/blogListReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [commentInput, setCommentInput] = useState('')

  if (!blog) { return <div>404 Not found</div> }
  return (
    <div className="blog">
      <h2>
      {blog.title}
      {' '}
      {blog.author}
      </h2>
      <div className="blog-details">
        {blog.url}
        <br />
        likes:
        {' '}
        {blog.likes}
        {' '}
        <button type="button" className="like-button" onClick={() => dispatch(likeBlog(blog))}>like</button>
        <br />
        Added by {blog.user.name}
        <br />
        <button type="button" className="delete-blog-button" onClick={() => {dispatch(deleteBlog(blog));history.push('/')}}>delete</button>
      </div>
      <h3>Comments</h3>
      <div>
        <input value={commentInput} onChange={(e)=>setCommentInput(e.target.value)} />
        <button onClick={()=>{dispatch(addComment(blog, commentInput));setCommentInput('')}}>Add comment</button>
      </div>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
