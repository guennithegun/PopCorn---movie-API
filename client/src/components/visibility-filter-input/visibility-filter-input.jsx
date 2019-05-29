////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';

function VisibilityFilterInput(props) {
  return <Form.Control
    className="visibilityFilterForm"
    onChange={event => props.setFilter(event.target.value)}
    value={props.visibilityFilter}
    placeholder='filter movies'
  />;
}

export default connect(
  ({visibilityFilter}) => ({visibilityFilter}),
  { setFilter }
)(VisibilityFilterInput);
