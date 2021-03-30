import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, color }) => {
  const messageStyle = {
    color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return (
    <div>
      <span style={messageStyle}>{message}</span>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Notification;
