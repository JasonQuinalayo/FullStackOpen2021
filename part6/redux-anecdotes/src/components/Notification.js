import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }


  return (
    <>
    {notification && 
    <div style={style}>
      <span>{notification}</span>
    </div>
    }
    </>
  )
}

const mapStateToProps = (state) => (
  {
    notification:state.notification.notification
  }
)
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
