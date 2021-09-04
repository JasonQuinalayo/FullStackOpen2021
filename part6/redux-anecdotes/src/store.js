import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const combinedReducers = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
