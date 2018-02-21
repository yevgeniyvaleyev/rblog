import { combineReducers } from 'redux';
import { 
  FETCH_CATEGORIES,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_COMMENTS,
  FETCH_COMMENT,
  UPDATED_COMMENT,
  DETELE_COMMENT,
  DETELE_POST,
  UPDATED_POST,
  ADDED_COMMENT,
  FETCH_POST_ERROR,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_START
 } from '../actions/actions';

function categories (state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload
    default:
      return state;
  }
}

function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return [...action.payload]
    case FETCH_POST:
      return [action.payload]
    case UPDATED_POST:
      return [
        ...state.filter(({id}) => id !== action.payload.id),
        action.payload
      ]
    case DETELE_POST:
      return [...state.filter(({id}) => id !== action.payload.id)]
    default:
      return state;
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return [...action.payload]
    case FETCH_COMMENT:
      return [action.payload]
    case UPDATED_COMMENT:
      return [
        ...state.filter(({id}) => id !== action.payload.id),
        action.payload
      ]
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

function error (state = {}, action) {
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

const loading = combineReducers({
  posts: postsLoading
})

export default combineReducers({
  categories,
  posts,
  comments,
  error,
  loading
});

export const getCategories = (state) => [...state.categories];
export const getPosts = (state) => [...state.posts];
export const getPost = (state, id) => state.posts.find((post) => post.id === id);
export const getComment = (state, id) => state.comments.find((comment) => comment.id === id);
export const getComments = (state) => [...state.comments];
export const hasError = (state, id) => !!state.error[id];
export const arePostsLoading = (state) => state.loading.posts;