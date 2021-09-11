import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  return (
    <div id="login">
      <Form onSubmit={(event) => {event.preventDefault();dispatch(login({ username, password }))}}>
        <Form.Group>
          <h2>Login to the Application</h2>
          <Form.Label>username: </Form.Label>
          <Form.Control
            id="username"
            name="Username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <Form.Label>password: </Form.Label>
          <Form.Control
            id="password"
            name="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <Button id="login-button" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
