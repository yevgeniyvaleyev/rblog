import { combineReducers } from 'redux';
import { FETCH_CATEGORIES } from '../actions/actions';

function categories (state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload
    default:
      return state;
  }
}

export default combineReducers({
  categories
});

export const getCategories = (state) => [...state.categories];