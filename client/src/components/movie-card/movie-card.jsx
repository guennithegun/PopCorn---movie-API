////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      //<div className="movie-card" onClick={() => onClick(movie)}>{movie.Title}</div>
      <Card style={{ width: '100%'}} >
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onClick(movie)} variant="primary">More</Button>
        </Card.Body>
      </Card>
    );
  }
}

////////////
// DEFINING PROPTYPES
////////////
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
