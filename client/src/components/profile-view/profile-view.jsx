////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';

import './profile-view.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null
    };
  }

  //delete user
  deleteUser(event) {
    event.preventDefault();
    axios.delete(`https://popcorn-movieapp.herokuapp.com/users/${this.props.user.Username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      alert('Your Account has been deleted!');
      //clears storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      //opens login view
      window.open('/', '_self');
    })
    .catch(event => {
      alert('failed to delete user');
    });
  }

  //handle the changes
  handleChange(event) {
    this.setState( {[event.target.name]: event.target.value} )
  }

  //update user data
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username);
    axios.put(`https://popcorn-movieapp.herokuapp.com/users/${this.props.user.Username}`, {
      Username: this.state.username,
      Password: this.state.password,
      EMail: this.state.email,
      Birthday: this.state.birthday
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      console.log(response);
      alert('Your data has been updated!');
      //update localStorage
      localStorage.setItem('user', this.state.username);
    })
    .catch(event => {
      console.log('error updating the userdata');
      alert('Ooooops... Something went wrong!');
    });
  };

  toggleForm() {
    let form = document.getElementsByClassName('changeDataForm')[0];
    let toggleButton = document.getElementById('toggleButton');
    form.classList.toggle('show-form');
    if (form.classList.contains('show-form')) {
      toggleButton.innerHTML= 'CHANGE DATA &uarr;';
    } else {
      toggleButton.innerHTML = 'CHANGE DATA &darr;';
    }
  }

  render() {
    const {user} = this.props;

    if (!user) return null;

    return (
      <div className="profile-view">
        <h1>Your Profile Data</h1>
        <div className="username">
          <div className="label">Name</div>
          <div className="value">{user.Username}</div>
        </div>
        <div className="password">
          <div className="label">Password</div>
          <div className="value">***********</div>
        </div>
        <div className="birthday">
          <div className="label">Birthday</div>
          <div className="value">{user.Birthday}</div>
        </div>
        <div className="email">
          <div className="label">EMail</div>
          <div className="value">{user.EMail}</div>
        </div>
        <div className="favoriteMovies">
          <div className="label">Favorite Movies</div>
          <div className="value">{user.FavoriteMovies}</div>
        </div>
        <Link to={'/'}>
          <Button className="view-btn" variant="primary" type="button">
          BACK
          </Button>
        </Link>
        <Button className="view-btn" variant="primary" type="button" onClick={(event) => this.deleteUser(event)}>
        DELETE
        </Button>
        <Button id="toggleButton" className="view-btn" variant="primary" type="button" onClick={() => this.toggleForm()}>
        CHANGE DATA &darr;
        </Button>

        <Form className="changeDataForm">
          <h2>Change Data</h2>
          <Form.Group controlId="formBasicUsername">
            <Form.Label >Your Username</Form.Label>
            <Form.Control type="text" name="username" onChange={event => this.handleChange(event)} placeholder="Enter Username" />
            <Form.Text className="text-muted">
            Type your username here.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Your Password</Form.Label>
            <Form.Control type="password" name="password" onChange={event => this.handleChange(event)} placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Your Email</Form.Label>
            <Form.Control type="email" name="email" onChange={event => this.handleChange(event)} placeholder="example@ema.il" />
          </Form.Group>

          <Form.Group controlId="formBasicBirthday">
            <Form.Label>Your Birthday</Form.Label>
            <Form.Control type="text" name="birthday" onChange={event => this.handleChange(event)} placeholder="01.01.2000" />
          </Form.Group>

          <Button variant="primary" type="button" onClick={event => this.handleSubmit(event)} >
          CHANGE!
          </Button>
        </Form>
      </div>
    );
  }
}

////////////
// DEFINING PROPTYPES
////////////
// ProfileView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string,
//     Description: PropTypes.string,
//     ImagePath: PropTypes.string,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string
//     })
//   }).isRequired
// };
