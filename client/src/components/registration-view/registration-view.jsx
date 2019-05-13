////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';

import './registration-view.scss';

////////////
// DECLARE AND EXPORT FUNCTION COMPONENTS
////////////

export function RegistrationView(props) {
  const [username, setUsername ] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://popcorn-movieapp.herokuapp.com/users', {
      Username: username,
      Password: password,
      EMail: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');
    })
    .catch(event => {
      console.log('error registering the user')
    });
  };

  return (
    <Form>
      <h2>Sign In!</h2>
      <Form.Group controlId="formBasicUsername">
        <Form.Label >Your Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
        <Form.Text className="text-muted">
        Type your username here.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Your Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Your Email</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@ema.il" />
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Your Birthday</Form.Label>
        <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="01.01.2000" />
      </Form.Group>

      <Button variant="primary" type="button" onClick={handleSubmit}>
      SIGN IN
      </Button>
      <p>
        Already Member?
        <Link to={'/'}>
          <span> LOG IN</span>
        </Link>
      </p>
    </Form>
  );
}
