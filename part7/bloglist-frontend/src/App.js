import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import blogService from './services/blogs';
import Login from './components/Login';
import Notification from './components/Notification';
import AddBlogForm from './components/AddBlogForm';
import Togglable from './components/Togglable';
import BlogList from './components/BlogList'
import Users from './components/Users'
import Blog from './components/Blog'
import UserData from './components/UserData'
import NavBar from './components/NavBar';
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogListReducer';
import { initializeUsers } from './reducers/usersReducer';


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const { user, users, blogList }  = useSelector(state => ({ user: state.user, users: state.users, blogList: state.blogList }))

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const userMatch = useRouteMatch('/users/:id')
  const userData = userMatch ? users.find(u => u.id === userMatch.params.id) : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogData = blogMatch ? blogList.find(b => b.id === blogMatch.params.id) : null

  const addBlogFormRef = useRef();

  return (
    <div className="container">
      <NavBar />
      <Notification />
      { !user
        ? (
          <Login />
        )
        : (
          <div>
            <h2>blogs</h2>
            <Switch>
              <Route exact path="/">
                <Togglable buttonLabel="add blog" ref={addBlogFormRef}>
                  <AddBlogForm togglableRef={addBlogFormRef}/>
                </Togglable>
                <BlogList />
              </Route>
              <Route exact path="/blogs/:id">
                <Blog blog={blogData}/>
              </Route>
              <Route exact path="/users/:id">
                <UserData userData={userData}/>
              </Route>
              <Route exact path="/users">
                <Users />
              </Route>
            </Switch>
          </div>
        )
      }
    </div>
  );
};

export default App;
