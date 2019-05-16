////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';

import './login-view.scss';

////////////
// DECLARE AND EXPORT FUNCTION COMPONENTS
////////////

export function LoginView(props) {
  const [username, setUsername ] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://popcorn-movieapp.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(event => {
      alert('no such user: ' + username);
    });
  };

  return (
    <Form className="login-view">
      <h2>Log In!</h2>
      <Form.Group controlId="formBasicEmail">
        <Form.Label >Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
        <Form.Text className="text-muted">
        Type your username here.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="button" onClick={handleSubmit}>
      LOGIN
      </Button>
      <p>Not registered???</p>
      <p>
        Start Enjoying
        <Link to={'/register'}>
          <span> HERE</span>
        </Link>
      </p>
    </Form>
  );
}

////////////
// DEFINING PROPTYPES
////////////
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
