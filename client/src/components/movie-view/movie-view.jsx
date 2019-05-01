////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
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
    const {movie, onClick} = this.props;

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
        <img className="movie-poster" src={movie.ImagePath}/>
        <div className="movie-genre">
          <div className="label">Genre</div>
          <div className="value">{movie.Genre.Name}</div>
        </div>
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value">{movie.Director.Name}</div>
        </div>
        <Button variant="primary" type="button" onClick={() => onClick()} >
        BACK
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
    Title: PropTypes.string
  }).isRequired,
  movie: PropTypes.shape({
    Description: PropTypes.string
  }).isRequired,
  movie: PropTypes.shape({
    ImagePath: PropTypes.string
  }).isRequired,
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
  movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
