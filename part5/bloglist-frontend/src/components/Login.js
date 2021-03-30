import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ loginHandler }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div id="login">
      <form onSubmit={loginHandler({ username, password })}>
        <h2>Login to the Application</h2>
        <span>username: </span>
        <input
          id="username"
          name="Username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <span>password: </span>
        <input
          id="password"
          name="Password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  loginHandler: PropTypes.func.isRequired,
};

export default Login;
