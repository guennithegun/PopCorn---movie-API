////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './genre-view.scss';

////////////
// DECLARE AND EXPORT COMPONENTS
////////////
export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {genre} = this.props;

    if (!genre) return null;

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
}

////////////
// DEFINING PROPTYPES
////////////
GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};
