import {
  onCategoriesFetched,
  onCommentAdded,
  onCommentDeleted,
  onCommentFetched,
  onCommentsFetched,
  onCommentUpdated,
  onPostAdded,
  onPostDeleted,
  onPostFetched,
  onPostFetchError,
  onPostsFetched,
  onPostsFetchStart,
  onPostUpdated,
  onVoteRequestStart,
  onVoteRequestEnd,
  onVoteCancel,
  onVoteChanged
} from './action-creators';

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
    if (post.error || Object.values(post).length === 0) {
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

const voteFor = (type, isUpvote, id, isUnvote, isInversiveVote, onUpdateCallback, dispatch) => {
  const votePartial = request.bind(null, `/${type}/${id}`, 'post', { option: isUpvote ? 'upVote' : 'downVote' });
  const requestList = isInversiveVote ? [votePartial(), votePartial()]: [votePartial()];
  
  dispatch(onVoteRequestStart());  
  return Promise.all(requestList)
    .then((values) => {
      dispatch(isUnvote ? 
        onVoteCancel() :
        onVoteChanged(id, isUpvote));
      dispatch(onVoteRequestEnd(id, isUpvote, isUnvote));
      dispatch(onUpdateCallback(values.pop()));
    })
}

export const voteForPost = (isUpvote, id, isUnvote, isInversiveVote) => (dispatch, getState) =>
  voteFor('posts', isUpvote, id, isUnvote, isInversiveVote, onPostUpdated, dispatch)

export const voteForComment = (isUpvote, id, isUnvote, isInversiveVote) => (dispatch, getState) =>
  voteFor('comments', isUpvote, id, isUnvote, isInversiveVote, onCommentUpdated, dispatch)

