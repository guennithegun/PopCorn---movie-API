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
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  componentDidMount() {
    axios.get('https://popcorn-movieapp.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  getBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }

  register() {
    this.setState({
      register: true
    })
  }

  alreadyMember() {
    this.setState({
      register: false
    })
  }

  render() {
    const {movies, selectedMovie, user, register} = this.state;

    if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />

    if (register) return <RegistrationView onClick={() => this.alreadyMember()} onSignedIn={user => this.onSignedIn(user)} />

    if (!movies) return <div className="main-view"/>;
    return (
      <div className="main-view">
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
