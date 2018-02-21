import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { getPost, hasError } from '../reducers';
import { withRouter } from 'react-router';
import { fetchPost, deletePost } from '../actions';
import ManageComment from './manage-comment';
import { PostDetails } from '../components/posts-details';
import NoMatch from '../components/no-match';

class Post extends Component {

  componentDidMount () {
    const { postId } = this.props.match.params;
    
    this.props.fetchPost(postId);
  }

  render() {
    const { post, deletePost, match, hasError } = this.props;
    
    if (hasError) {
      return <NoMatch what="Post"/>
    }
    
    return post ? (
      <div>
        <Route path={`/:categoryName/:postId/comment`} exact component={ManageComment} />
        <Route path={`/:categoryName/:postId/comment/:commentId`} component={ManageComment} />
        
        <PostDetails 
          deletePost={deletePost}
          goBack={this.props.history.goBack}
          post={post} />
      </div>
    ) : (
      <em>Loading post...</em>
    )
  }
}

const mapStateToProps = (state, props) => ({
  post: getPost(state, props.match.params.postId),
  hasError: hasError(state, props.match.params.postId)
}); 

Post = withRouter(connect(
  mapStateToProps,
  { 
    fetchPost,
    deletePost
  }
)(Post));

export default Post;
