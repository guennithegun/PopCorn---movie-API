////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn } = state;
  let  sortedMovies = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0
  });

  return { movies: sortedMovies };
};

////////////
// DECLARE AND EXPORT FUNCTIONS
////////////
function MoviesList(props) {
  const { movies } = props;

  if (!movies) return <div className="main-view" />

  return movies.map(movie => (
    <Col key={movie._id} xs={12} sm={6} md={4}>
      <MovieCard key={movie._id} movie={movie} />
    </Col>
  ));
}

export default connect(mapStateToProps)(MoviesList);
