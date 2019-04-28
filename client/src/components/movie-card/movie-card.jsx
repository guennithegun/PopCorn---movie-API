////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      //<div className="movie-card" onClick={() => onClick(movie)}>{movie.Title}</div>
      <Card style={{ width: '16rem' }} xs={4}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
