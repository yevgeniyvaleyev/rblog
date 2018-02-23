import { 
  VOTE_CHANGE_END,
  VOTE_CANCEL,
  VOTE_CHANGED
 } from '../actions/types';

export function voted (state = {}, action) {
  switch (action.type) {
    case VOTE_CHANGED:
      return {
        ...state,
        [action.payload.id]: action.payload.isUpvote
      }
    case VOTE_CANCEL:
      return {
        ...state,
        [action.payload.id]: null
      }
    default:
      return state;
  }
}