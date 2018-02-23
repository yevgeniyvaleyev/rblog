import { 
  FETCH_POSTS,
  FETCH_POSTS_START
 } from '../actions/types';
 import { combineReducers } from 'redux';

function postsLoading (state = false, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return false
    case FETCH_POSTS_START:
      return true
    default:
      return state;
  }
}

export const loading = combineReducers({
  posts: postsLoading
})