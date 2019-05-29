////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import MovieView from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      //movies: [],
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
      this.props.setMovies(response.data);
      localStorage.setItem('movies', JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //logging in
  onLoggedIn(authData) {
    console.log(authData.user);
    this.setState({
      user: authData.user.Username,
      profileData: authData.user
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
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
    localStorage.removeItem('movies');

    //resets user state to render again
    this.setState({
      user: null
    });

    //make sure login screen appears after logging out
    window.open('/', '_self');
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <header>
          <h1>PopCorn</h1>
          <div>
            <img src="/img/popcornclient.png" alt="Popcorn bucket"/>
            <img src="/img/popcornclient.png" alt="Popcorn bucket"/>
            <img src="/img/popcornclient.png" alt="Popcorn bucket"/>
          </div>
          <p>Enjoy Responsable.</p>
        </header>
        <div className="main-view">
          {user &&
            <div className="navbar">
              <Link to={'/profile'}>
                <button>MyProfile</button>
              </Link>
              <button onClick={() => this.logOut()}>LogOut <img src="/img/exit.png" alt="shut down button sign"/></button>
            </div>
          }

          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <MoviesList />;
            }}
          />

          <Route exact path="/movies/:id" render={({ match }) => <MovieView movieId={match.params.id}/>}/>

          <Route exact path="/genres/:name" render={ ({match}) => {
            if (!movies || !movies.length) return <div className="main-view"/>;
            return <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name).Genre} />}
          }/>

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies || !movies.length) return <div className="main-view"/>;
            return <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director}/>}
          }/>

          <Route exact path="/register" render={() => <RegistrationView onSignedIn={user => this.onSignedIn(user)} />} />

          <Route exact path="/profile" render={() => <ProfileView />}/>
        </div>
      </Router>
    );
  }
}

export default connect(null, { setMovies } )(MainView);
