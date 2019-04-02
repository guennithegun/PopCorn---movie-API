////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div className="movie-card" onClick={() => onClick(movie)}>{movie.Title}</div>
    );
  }
}
