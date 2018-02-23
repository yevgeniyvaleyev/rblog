import { 
  FETCH_POST_ERROR
 } from '../actions/types';

export function error (state = {}, action) {
  switch (action.type) {
    case FETCH_POST_ERROR:
      return {
        ...state,
        [action.payload.postId]: true
      }
    default:
      return state;
  }
}