////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovieId: null,
      user: null,
      register: false
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }

    //hash routing
    window.addEventListener('hashchange', this.handleNewHash, false);
    this.handleNewHash();
  }

  //parsing hash
  handleNewHash = () => {
    const movieId = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');

    this.setState({
      selectedMovieId: movieId[0]
    });
  }

  //get list of all movies
  getMovies(token) {
    axios.get('https://popcorn-movieapp.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //show single movie details
  onMovieClick(movie) {
    //hash
    window.location.hash = '#' + movie._id;
    this.setState({
      selectedMovieId: movie._id
    });
  }

  //get back to main-view
  getBackClick() {
    this.setState({
      selectedMovieId: null
    });
  }

  //logging in
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  //registrate new user
  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }

  //go to register-view
  register() {
    this.setState({
      register: true
    })
  }

  //get back from register-view to login-view
  alreadyMember() {
    this.setState({
      register: false
    })
  }

  //logut function for LogOut button
  logOut() {
    //clears storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    //resets user state to render again
    this.setState({
      user: null
    })
  }

  render() {
    const {movies, selectedMovieId, user, register} = this.state;

    //shows login-view as standard
    if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />

    //if user clicks HERE on login-view this displays the registration-view
    if (register) return <RegistrationView onClick={() => this.alreadyMember()} onSignedIn={user => this.onSignedIn(user)} />

    if (!movies) return <div className="main-view"/>;

    //for hash routing
    const selectedMovie = selectedMovieId ? movies.find(movie => movie._id === selectedMovieId) : null;

    return (
      <div className="main-view">
      <div className="logout">
        <button onClick={() => this.logOut()}>LogOut <img src="/img/exit.png" alt="shut down button sign"/></button>
      </div>
      <Container>
      <Row>
      {selectedMovie
        ? <MovieView movie={selectedMovie} onClick={() => this.getBackClick()}/>
        : movies.map(movie => (
          <Col key={movie._id} xs={12} sm={6} md={4}>
          <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
          </Col>
        ))
      }
      </Row>
      </Container>
      </div>
    );
  }
}
