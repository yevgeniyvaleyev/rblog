import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_COMMENTS,
  FETCH_COMMENT,
  DETELE_COMMENT,
  ADDED_COMMENT,
  UPDATED_COMMENT,
  DETELE_POST,
  ADDED_POST,
  UPDATED_POST,
  FETCH_POST_ERROR,
  FETCH_POSTS_START,
  VOTE_CHANGE_END,
  VOTE_CHANGE_START,
  VOTE_CANCEL,
  VOTE_CHANGED
} from './types';

export const onCategoriesFetched = (data) => ({
  type: FETCH_CATEGORIES,
  payload: data
});

export const onPostsFetched = (data) => ({
  type: FETCH_POSTS,
  payload: data
});

export const onPostsFetchStart = () => ({
  type: FETCH_POSTS_START,
  payload: {}
});

export const onPostDeleted = (data) => ({
  type: DETELE_POST,
  payload: data
});

export const onPostAdded = (data) => ({
  type: ADDED_POST,
  payload: data
});

export const onPostUpdated = (data) => ({
  type: UPDATED_POST,
  payload: data
});

export const onPostFetched = (data) => ({
  type: FETCH_POST,
  payload: data
});

export const onPostFetchError = (postId) => ({
  type: FETCH_POST_ERROR,
  payload: { postId }
});

export const onCommentsFetched = (data) => ({
  type: FETCH_COMMENTS,
  payload: data
});

export const onCommentFetched = (data) => ({
  type: FETCH_COMMENT,
  payload: data
});

export const onCommentDeleted = (data) => ({
  type: DETELE_COMMENT,
  payload: data
});

export const onCommentAdded = (data) => ({
  type: ADDED_COMMENT,
  payload: data
});

export const onCommentUpdated = (data) => ({
  type: UPDATED_COMMENT,
  payload: data
});

export const onVoteRequestStart = () => ({
  type: VOTE_CHANGE_START,
  payload: {}
});

export const onVoteRequestEnd = (id, isUpvote, isUnvote) => ({
  type: VOTE_CHANGE_END,
  payload: {id, isUpvote, isUnvote}
});

export const onVoteCancel = (id) => ({
  type: VOTE_CANCEL,
  payload: {id}
});

export const onVoteChanged = (id, isUpvote) => ({
  type: VOTE_CHANGED,
  payload: {id, isUpvote}
});