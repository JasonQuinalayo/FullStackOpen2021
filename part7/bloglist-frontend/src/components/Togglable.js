import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button type="button" onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button size="sm" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
