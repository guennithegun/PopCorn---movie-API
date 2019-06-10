////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './genre-view.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
function GenreView(props) {
  const { movies, genreName } = props;

  if (!movies || !movies.length) return null;

  const genre = movies.find(movie => movie.Genre.Name == genreName).Genre;

  return (
    <div className="genre-view">
      <h1 className="genre">{genre.Name}</h1>
      <div className="description">{genre.Description}</div>
      <Link to={'/'}>
        <Button variant="primary" type="button">
        BACK
        </Button>
      </Link>
    </div>
  );
}

export default connect(({movies}) => ({movies}))(GenreView);
