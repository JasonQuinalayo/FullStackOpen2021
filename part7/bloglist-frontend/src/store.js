import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogListReducer from './reducers/blogListReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import thunk from 'redux-thunk'

const combinedReducers = combineReducers({
  notification: notificationReducer,
  blogList: blogListReducer,
  user: userReducer,
  users: usersReducer,
})

const store = createStore(combinedReducers, applyMiddleware(thunk))

export default store
