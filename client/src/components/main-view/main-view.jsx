////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
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

  render() {
    const {movies, selectedMovie, user} = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

    if (!movies) return <div className="main-view"/>;
    return (
      <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onClick={() => this.getBackClick()}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
        ))
      }
      </div>
    );
  }
}
