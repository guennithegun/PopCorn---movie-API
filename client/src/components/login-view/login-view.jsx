////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React, { useState } from 'react';
import axios from 'axios';

////////////
// DECLARE AND EXPORT FUNCTION COMPONENTS
////////////

export function LoginView(props) {
  const [username, setUsername ] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://popcorn-movieapp.herokuapp.com/login', {})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    //console.log(username, password);
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}
