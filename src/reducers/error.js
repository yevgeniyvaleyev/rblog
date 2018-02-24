import { 
  FETCH_POST_ERROR,
  FETCH_COMMENT_ERROR
 } from '../actions/types';

export function error (state = {}, action) {
  switch (action.type) {
    case FETCH_POST_ERROR:
    case FETCH_COMMENT_ERROR:
      return {
        ...state,
        [action.payload.id]: true
      }
    default:
      return state;
  }
}