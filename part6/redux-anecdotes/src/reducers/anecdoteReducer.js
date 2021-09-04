import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id === action.data.id ? {...anecdote, votes: anecdote.votes + 1} : anecdote)
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTE':
      return action.data.anecdotes
    default:
      return state;
  }
}

export const vote = (id) => (
  async dispatch => {
    const data = await anecdoteService.vote(id)
    dispatch({
      type:'VOTE',
      data: { id:data.id },
    })
  }
)

export const addAnecdote = (content) => (
  async dispatch => {
    const data = await anecdoteService.addAnecdote(content)
    dispatch({
      type:'ADD_ANECDOTE',
      data,
    })
  }
)

export const initAnecdotes = () => (
  async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: { anecdotes },
    })
  }
)

export default anecdoteReducer
