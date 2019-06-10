////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './director-view.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
function DirectorView(props) {
  const { movies, directorName } = props;

  if (!movies || !movies.length) return null;

  const director = movies.find(movie => movie.Director.Name == directorName).Director;

  return (
    <div className="director-view">
      <h1 className="director">{director.Name}</h1>
      <h2>Biography</h2>
      <div className="bio">{director.Bio}</div>
      <h2>Born</h2>
      <div className="birth">{director.Birth}</div>
      <h2>Died</h2>
      <div className="death">{director.Death}</div>
      <h2>Movies</h2>
      <div className="movies">{director.Movies.map((movie, i) => { return <p key={i}>{movie}</p>})}</div>
      <Link to={'/'}>
        <Button variant="primary" type="button">
        BACK
        </Button>
      </Link>
    </div>
  );
}

export default connect(({movies}) => ({movies}))(DirectorView);
