////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn } = state;

  let  moviesToShow = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0
  });

  if (visibilityFilter !== '') {
    moviesToShow = moviesToShow.filter(movie => movie.title.includes(visibilityFilter));
  }

  return { movies: moviesToShow };
};

////////////
// DECLARE AND EXPORT FUNCTIONS
////////////
function MoviesList(props) {
  const { movies } = props;

  if (!movies) return <div className="main-view" />;

  return <div className="movie-list">
    <VisibilityFilterInput />
    {movies.map(movie => (
    <Col key={movie._id} xs={12} sm={6} md={4}>
      <MovieCard key={movie._id} movie={movie} />
    </Col>
    ));
    }
    </div>;
}

export default connect(mapStateToProps)(MoviesList);
