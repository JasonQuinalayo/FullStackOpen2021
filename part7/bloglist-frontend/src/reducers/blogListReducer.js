import blogService from '../services/blogs'
import { notifyConfirm, notifyError } from './notificationReducer'

const initialBlogList = []

const blogListReducer = (state=initialBlogList, action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      return action.data
    case 'UPDATE_BLOG':
      const newBlogs = state.filter((oldBlog) => oldBlog.id !== action.data.id);
      newBlogs.push(action.data);
      return newBlogs
    case 'DELETE_BLOG':
      const _newBlogs = state.filter((blog) => blog.id !== action.data);
      return _newBlogs 
    case 'ADD_BLOG':
      return state.concat({ ...action.data, user:action.data.user})
    default:
      return state
  }
}

export const initializeBlogs = () => (
  async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs 
    })
  }
)

export const likeBlog = (blog) => (
  async dispatch => {
    const response = await blogService.updateBlog(blog.id, {
      likes: blog.likes + 1,
    });
    dispatch({
      type: 'UPDATE_BLOG',
      data: response,
    })
  }
)

export const addBlog = (blog, togglableRef, user) => (
  async dispatch => {
    try {
      const result = await blogService.addBlog({
        title: blog.title, author: blog.author, url: blog.url,
      });
      togglableRef.current.toggleVisibility();
      dispatch(notifyConfirm(`Added ${result.title} by ${result.author}`));
      dispatch({ type: 'ADD_BLOG', data: { ...result, user: { name: user }}} )
    } catch (err) {
      dispatch(notifyError('invalid token'));
    }
  }
);

export const deleteBlog = (blog) => (
  async dispatch => {
    const { id } = blog;
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(id);
        dispatch(notifyConfirm(`Deleted ${blog.title} by ${blog.author}`))
        dispatch({type:'DELETE_BLOG', data: blog.id})
      } catch (err) {
        if (err.response.status === 401) {
          dispatch(notifyError('Unauthorized deletion.'))
        } else {
          dispatch(notifyError(err.message))
        }
      }
  };
  }
)

export const addComment = (blog, comment) => (
  async dispatch => {
    let newComments;
    if (blog.hasOwnProperty('comments')) {
      newComments = { comments: blog.comments.concat(comment) }
    } else {
      newComments = { comments: [comment] }
    }
    const response = await blogService.updateBlog(blog.id, newComments)
    dispatch({
      type:'UPDATE_BLOG',
      data: response,
    })
  }
)

export default blogListReducer
