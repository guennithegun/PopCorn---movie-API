////////////
// IMPORT ALL NECESSARY MODULES AND FILES
////////////
import { combineReducers } from 'redux';
import { SET_MOVIES, SET_FILTER, SET_SORT_COLUMN } from '../actions/actions.js';

////////////
// FUNCTIONS
////////////

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function sortColumn(state = 'title', action) {
  switch (action.type) {
    case SET_SORT_COLUMN:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function moviesApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    sortColumn: sortColumn(state.sortColumn, action),
    movies: movies(state.movies, action)
  }
}


export default moviesApp;
