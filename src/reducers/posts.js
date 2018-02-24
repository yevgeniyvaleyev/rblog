import { 
  FETCH_POSTS,
  FETCH_POST,
  DETELE_POST,
  UPDATED_POST
 } from '../actions/types';

export function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return [...action.payload]
    case FETCH_POST:
      return [action.payload]
    case UPDATED_POST:
      return state.map((post) => 
        post.id !== action.payload.id ? post : action.payload)
    case DETELE_POST:
      return [...state.filter(({id}) => id !== action.payload.id)]
    default:
      return state;
  }
}