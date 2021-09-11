import loginService from '../services/login'
import blogService from '../services/blogs'
import { clearNotification, notifyError } from './notificationReducer'

const initialUser = null

const userReducer = (state=initialUser, action) => {
  switch(action.type) { 
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null 
    default:
      return state
  }
}

export const login = credentials => (
  async dispatch => {
    try {
      const user = await loginService.login({
        username: credentials.username, password: credentials.password,
      });
      dispatch(setUser(user));
      blogService.setToken(user.token);
      dispatch(clearNotification())
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user),
      );
    } catch (exception) {
      dispatch(notifyError('Wrong credentials'));
    }
  }
)

export const setUser = user => ({ type: 'SET_USER', data:user})

export const logout = () => (
  async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatch(clearNotification())
    dispatch({ type:'LOGOUT' });
  }
)

export default userReducer
