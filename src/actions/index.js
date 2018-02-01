import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_COMMENTS,
  DETELE_COMMENT,
  DETELE_POST
} from './actions';

export const onCategoriesFetched = (data) => ({
  type: FETCH_CATEGORIES,
  payload: data
});

export const onPostsFetched = (data) => ({
  type: FETCH_POSTS,
  payload: data
});

export const onPostFetched = (data) => ({
  type: FETCH_POST,
  payload: data
});

export const onCommentsFetched = (data) => ({
  type: FETCH_COMMENTS,
  payload: data
});

export const onCommentDeleted = (data) => ({
  type: DETELE_COMMENT,
  payload: data
});

export const onPostDeleted = (data) => ({
  type: DETELE_POST,
  payload: data
});

const api = 'http://localhost:3001';

// CONFIG maybe ?
const request = (url, method = 'get') => 
  fetch(`${api}${url}`, 
    { 
      headers: { 'Authorization': 'whatever-you-want' },
      method
    })
  .then((response) => response.json());

export const fetchCategories = () => (dispatch, getState) => {
  request('/categories').then((data) => {
    dispatch(onCategoriesFetched(data.categories));
  });
}

export const fetchPosts = (categoryId = '') => (dispatch, getState) => {
  const postsRest = categoryId ? `${categoryId}/posts` : `posts`
  request(`/${postsRest}`).then((posts) => {
    dispatch(onPostsFetched(posts));
  });
}

export const fetchPost = (postId = '') => (dispatch, getState) => {
  request(`/posts/${postId}`).then((post) => {
    dispatch(onPostFetched(post));
  });
}

export const fetchComments = (postId = '') => (dispatch, getState) => {
  request(`/posts/${postId}/comments`).then((comments) => {
    dispatch(onCommentsFetched(comments));
  });
}

export const deleteComment = (commentId) => (dispatch, getState) => {
  return request(`/comments/${commentId}`, 'delete').then((comment) => {
    dispatch(onCommentDeleted(comment));
  });
}

export const deletePost = (postId) => (dispatch, getState) => {
  return request(`/posts/${postId}`, 'delete').then((post) => {
    debugger
    dispatch(onPostDeleted(post));
  });
}

