const initialNotification = {message:'', error:false} 

const notificationReducer = (state=initialNotification, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {message: action.data.message, error: action.data.error}
    case 'CLEAR':
      return {message:'', error: false}
    default:
      return state
  }
}

export const notifyConfirm = (message) => (
  {
      type: 'NOTIFY',
      data: {
        message,
        error:false,
      }
  }
)

export const notifyError = (message) => (
  {
      type: 'NOTIFY',
      data: {
        message,
        error:true,
      }
  }
)

export const clearNotification = () => (
  {
    type: 'CLEAR',
  }
)

export default notificationReducer
