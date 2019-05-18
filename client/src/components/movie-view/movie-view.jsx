////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './movie-view.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  //add movie to FavoriteList
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props.user.Username);
    axios.put(`https://popcorn-movieapp.herokuapp.com/users/${this.props.user.Username}/movies/${this.props.movie._id}`, {
      Username: this.props.user.Username
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      console.log(response);
      alert('Movie has been added to your Favorite List!');
    })
    .catch(event => {
      console.log('error adding movie to list');
      alert('Ooooops... Something went wrong!');
    });
  };

  render() {
    const {movie} = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <div className="movie-title">
          <div className="label">Title</div>
          <h1>{movie.Title}</h1>
        </div>
        <img className="movie-poster" src={movie.ImagePath} alt="movie cover" />
        <div className="movie-description">
          <div className="label">Description</div>
          <div className="value">{movie.Description}</div>
        </div>
        <div className="movie-genre">
          <div className="label">Genre</div>
          <div className="value">{movie.Genre.Name}</div>
        </div>
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value">{movie.Director.Name}</div>
        </div>
        <Link to={'/'}>
          <Button className="view-btn" variant="primary" type="button">
          BACK
          </Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button className="view-btn" variant="primary" type="button">
          GENRE
          </Button>
        </Link>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button className="view-btn" variant="primary" type="button">
          DIRECTOR
          </Button>
        </Link>
        <Button className="view-btn" variant="primary" type="button" onClick={event => this.handleSubmit(event)}>
        LIKE
        </Button>
      </div>
    );
  }
}

////////////
// DEFINING PROPTYPES
////////////
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired
};
