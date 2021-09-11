import React from 'react';
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const messageStyle = {
    color: notification.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return (
    <>
      {
        notification.message && 
        <span style={messageStyle}>{notification.message}</span>
      }
    </>
  );
};

export default Notification;
