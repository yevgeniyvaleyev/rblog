import { 
  FETCH_COMMENTS,
  FETCH_COMMENT,
  UPDATED_COMMENT,
  DETELE_COMMENT,
  ADDED_COMMENT
 } from '../actions/types';

export function comments (state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return [...action.payload]
    case FETCH_COMMENT:
      return [action.payload]
    case UPDATED_COMMENT:
      return state.map((comment) => 
        comment.id !== action.payload.id ? comment : action.payload)
    case ADDED_COMMENT:
      return [
        ...state,
        action.payload
      ]
    case DETELE_COMMENT:
      return [...state.filter(({id}) => id !== action.payload.id)]
    default:
      return state;
  }
}