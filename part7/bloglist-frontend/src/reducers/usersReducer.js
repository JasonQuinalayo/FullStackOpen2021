import usersService from '../services/users.js'

const initialUsers = []

const usersReducer = (state=initialUsers, action) => {
  switch(action.type) {
    case 'INITIALIZE_USERS':
      return action.data
    default: 
      return state
  }
}

export const initializeUsers = () => (
  async dispatch => {
    const users = await usersService.getAll()
    dispatch({ type: 'INITIALIZE_USERS', data:users})
  }
)

export default usersReducer
