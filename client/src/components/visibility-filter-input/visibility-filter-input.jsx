////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';

function VisibilityFilterInput(props) {
  return <Form>
  <Form.Control
    className="visibilityFilterForm"
    onChange={event => props.setFilter(event.target.value)}
    value={props.visibilityFilter}
    placeholder='filter movies'
  />
  <Form.Control as="select" className="selectFilter">
      <option>Title</option>
      <option>Genre</option>
      <option>Director</option>
  </Form.Control>
  </Form>
}

export default connect(
  ({visibilityFilter}) => ({visibilityFilter}),
  { setFilter }
)(VisibilityFilterInput);
