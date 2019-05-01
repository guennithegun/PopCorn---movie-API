////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';

////////////
// DECLARE AND EXPORT FUNCTION COMPONENTS
////////////

export function LoginView(props) {
  const [username, setUsername ] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return (
    <Form>
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
      <p>Start Enjoying <span onClick={() => props.onClick()}>HERE</span></p>
    </Form>
  );
}

////////////
// DEFINING PROPTYPES
////////////
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
