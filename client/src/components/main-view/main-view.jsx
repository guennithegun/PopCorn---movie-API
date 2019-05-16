////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import './main-view.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
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

  //logging in
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);

    //make navbar appear when logged in
    let navbar = document.getElementsByClassName('navbar')[0];
    navbar.classList.add('show-navbar');
  }

  //registrate new user
  onSignedIn(user) {
    this.setState({
      user: user
    });
  }

  //logut function for LogOut button
  logOut() {
    //clears storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    //resets user state to render again
    this.setState({
      user: null
    });

    //makes navbar disappear when logged out
    let navbar = document.getElementsByClassName('navbar')[0];
    navbar.classList.remove('show-navbar');

    //make sure login screen appears after logging out
    window.open('/', '_self');
  }

  render() {
    const {movies, user} = this.state;

    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <div className="main-view">
          <div className="navbar">
            <button onClick={() => this.logOut()}>LogOut <img src="/img/exit.png" alt="shut down button sign"/></button>
          </div>
          <Container>
            <Row>
              <Route exact path="/" render={ () => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return movies.map(movie => (
                  <Col key={movie._id} xs={12} sm={6} md={4}>
                    <MovieCard key={movie._id} movie={movie} />
                  </Col>
                ))}
              }/>
            </Row>
          </Container>

          <Route exact path="/movies/:movieId" render={ ({match}) => <MovieView movie={movies.find(movies => movies._id === match.params.movieId)} />} />

          <Route exact path="/register" render={() => <RegistrationView onSignedIn={user => this.onSignedIn(user)} />} />

          <Route exact path="/genres/:name" render={ ({match}) => {
            if (!movies || !movies.length) return <div className="main-view"/>;
            return <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name).Genre} />}
          }/>

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies || !movies.length) return <div className="main-view"/>;
            return <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director}/>}
          }/>
        </div>
      </Router>
    );
  }
}
