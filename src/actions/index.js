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
  FETCH_POSTS_START
} from './actions';

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

const api = 'http://localhost:3001';

// CONFIG maybe ?
const request = (url, method = 'get', data = null) => {
  const headers = {
    'Authorization': 'whatever-you-want' 
  }
  const config = {
    method
  };
  if (data) {
    headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify({ ...data });
  }
  config.headers = headers
  return fetch(`${api}${url}`, config)
  .then((response) => response.json())
}

export const fetchCategories = () => (dispatch, getState) => {
  request('/categories').then((data) => {
    dispatch(onCategoriesFetched(data.categories));
  });
}

export const fetchPosts = (categoryId = '') => (dispatch, getState) => {
  const postsRest = categoryId ? `${categoryId}/posts` : `posts`
  dispatch(onPostsFetchStart());
  request(`/${postsRest}`).then((posts) => {
    dispatch(onPostsFetched(posts));
  });
}

export const fetchPost = (postId = '') => (dispatch, getState) => {
  request(`/posts/${postId}`).then((post) => {
    if (post.error) {
      dispatch(onPostFetchError(postId));
      return;
    }
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
    dispatch(onPostDeleted(post));
  });
}

export const addPost = (postData) => (dispatch, getState) =>
  request(`/posts`, 'post', postData).then((post) => {
    dispatch(onPostAdded(post));
  })

export const updatePost = (postData, id) => (dispatch, getState) =>
  request(`/posts/${id}`, 'put', postData).then((post) => {
    dispatch(onPostUpdated(post));
  })

export const addComment = (commentData) => (dispatch, getState) =>
  request(`/comments`, 'post', commentData).then((comment) => {
    dispatch(onCommentAdded(comment));
  })

export const updateComment = (commentData, id) => (dispatch, getState) =>
  request(`/comments/${id}`, 'put', commentData).then((comment) => {
    dispatch(onCommentUpdated(comment));
  })

export const fetchComment = (commentId = '') => (dispatch, getState) => {
    request(`/comments/${commentId}`).then((comment) => {
      dispatch(onCommentFetched(comment));
    });
  }

