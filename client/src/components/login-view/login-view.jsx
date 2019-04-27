////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React, { useState } from 'react';
import axios from 'axios';
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
    // <form>
    //   <label>
    //     Username:
    //     <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
    //   </label>
    //   <button type="button" onClick={handleSubmit}>Submit</button>
    // </form>
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter Username" />
        <Form.Text className="text-muted">
        Type your username here.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
      Submit
      </Button>
    </Form>
  );
}
