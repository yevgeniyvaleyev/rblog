import { 
  FETCH_CATEGORIES
 } from '../actions/types';

export function categories (state = [], action) {
  if (action.type === FETCH_CATEGORIES) {
    return action.payload
  }
  return state;
}