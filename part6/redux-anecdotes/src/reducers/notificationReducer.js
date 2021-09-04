const initialNotification = {notification:'', tId:null} 

const notificationReducer = (state=initialNotification, action) => {
  switch (action.type) {
    case 'NOTIFY':
      if (state.tId) clearTimeout(state.tId)
      return {...state, notification: action.data.message, tId:action.data.tId}
    default:
      return state
  }
}

export const notify = (message, time) => (
  async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: {
        message, 
        tId: setTimeout(() => {
          dispatch({
            type:'NOTIFY',
            data: {
              message:'', tId:null
            }
          })
        }, time * 1000),
      }
    })
  }
)

export default notificationReducer
