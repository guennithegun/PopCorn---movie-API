////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './movie-view.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;

  const movie = movies.find(movie => movie._id == movieId);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put(`https://popcorn-movieapp.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, {
      Username: localStorage.getItem('user')
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
      <Button className="view-btn" variant="primary" type="button" onClick={event => handleSubmit(event)}>
      LIKE
      </Button>
    </div>
  );
}

export default connect(({movies}) => ({movies}))(MovieView);
