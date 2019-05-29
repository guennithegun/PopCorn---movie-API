////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class MovieCard extends React.Component {
  render() {
    //removed onClick
    const { movie } = this.props;

    return (
      <Card style={{ width: '100%'}} >
        <Link to={`/movies/${movie._id}`}>
          <Card.Img variant="top" src={movie.ImagePath} />
        </Link>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary">More</Button>
          </Link>
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
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string
  }).isRequired
};
