import { combineReducers } from 'redux';
import {categories} from './categories';
import {comments} from './comments';
import {error} from './error';
import {loading} from './loading';
import {posts} from './posts';
import {voted} from './voted';

export default combineReducers({
  categories,
  posts,
  comments,
  error,
  loading,
  voted
});

export const getCategories = (state) => [...state.categories];
export const getPosts = (state) => [...state.posts];
export const getPost = (state, id) => state.posts.find((post) => post.id === id);
export const getComment = (state, id) => state.comments.find((comment) => comment.id === id);
export const getComments = (state) => [...state.comments];
export const hasError = (state, id) => !!state.error[id];
export const arePostsLoading = (state) => state.loading.posts;
export const getVote = (state, id) => state.voted[id];
export const hasVoted = (state, id) => state.voted[id] === true || state.voted[id] === false;