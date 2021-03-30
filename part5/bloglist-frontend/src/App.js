import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/Login';
import loginService from './services/login';
import Notification from './components/Notification';
import AddBlogForm from './components/AddBlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const blogsList = await blogService.getAll();
    setBlogs(blogsList);
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlogFormRef = useRef();

  const printErrorMessage = (message) => {
    setError(true);
    setNotification(message);
  };

  const printConfirmationMessage = (message) => {
    setError(false);
    setNotification(message);
  };

  const handleLogin = (credentials) => async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: credentials.username, password: credentials.password,
      });
      setUser(user);
      blogService.setToken(user.token);
      setNotification('');
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user),
      );
    } catch (exception) {
      printErrorMessage('Wrong credentials');
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogAppUser');
    setNotification('');
    setUser(null);
  };

  const addBlog = async (blog) => {
    try {
      const result = await blogService.addBlog({
        title: blog.title, author: blog.author, url: blog.url,
      });
      setBlogs(await blogService.getAll());
      printConfirmationMessage(`Added ${result.title} by ${result.author}`);
      addBlogFormRef.current.toggleVisibility();
    } catch (err) {
      printErrorMessage('invalid token');
    }
  };

  const handleLike = (blog) => async () => {
    const response = await blogService.updateBlog(blog.id, {
      likes: blog.likes + 1,
    });
    const newBlogs = blogs.filter((oldBlog) => oldBlog.id !== response.id);
    newBlogs.push(response);
    setBlogs(newBlogs);
  };

  const handleDelete = (blog) => async (event) => {
    event.preventDefault();
    const { id } = blog;
    // eslint-disable-next-line no-alert
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        printConfirmationMessage(`Deleted ${blog.title} by ${blog.author}`);
      } catch (err) {
        if (err.response.status === 401) {
          printErrorMessage('Unauthorized deletion.');
        } else {
          printErrorMessage(err.message);
        }
      }
    }
  };

  return (
    <div>
      <div>{notification ? <Notification message={notification} color={error ? 'red' : 'green'} /> : <></>}</div>
      { !user
        ? (
          <Login loginHandler={handleLogin} />
        )
        : (
          <div>
            <h2>blogs</h2>
            <span>
              <strong>
                {user.name}
                {' '}
                logged in
              </strong>
            </span>
            <button id="logout-button" type="button" onClick={handleLogout}>logout</button>
            <Togglable buttonLabel="add blog" ref={addBlogFormRef}>
              <AddBlogForm addBlog={addBlog} />
            </Togglable>
            <div id="blogs-list">
              {blogs
                .sort((b, a) => {
                  if (a.likes < b.likes) return -1;
                  if (a.name === b.name) return 0;
                  return 1;
                })
                .map((blog) => (
                  <Blog
                    handleLike={handleLike(blog)}
                    handleDelete={handleDelete}
                    key={blog.id}
                    blog={blog}
                  />
                ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default App;
