////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
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

  render() {
    const {movie} = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <div className="movie-title">
          <div className="label">Title</div>
          <div className="value">{movie.Title}</div>
        </div>
        <div className="movie-description">
          <div className="label">Description</div>
          <div className="value">{movie.Description}</div>
        </div>
        <img className="movie-poster" src={movie.ImagePath} alt="movie cover" />
        <div className="movie-genre">
          <div className="label">Genre</div>
          <div className="value">{movie.Genre.Name}</div>
        </div>
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value">{movie.Director.Name}</div>
        </div>
        <Link to={'/'}>
          <Button variant="primary" type="button">
          BACK
          </Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="primary" type="button">
          GENRE
          </Button>
        </Link>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="primary" type="button">
          DIRECTOR
          </Button>
        </Link>
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
