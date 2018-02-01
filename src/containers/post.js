import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../reducers';
import { withRouter } from 'react-router';
import { fetchPost, deletePost } from '../actions';
import { PostDetails } from '../components/posts-details';

class Post extends Component {

  componentDidMount () {
    const { postId } = this.props.match.params;
    
    this.props.fetchPost(postId);
  }

  render() {
    const { post, deletePost } = this.props;
    debugger
    return post ? (
      <PostDetails 
        deletePost={deletePost}
        goBack={this.props.history.goBack}
        post={post} />
    ) : (
      <em>Loading post...</em>
    )
  }
}
Post.propTypes = {
  
};

const mapStateToProps = (state, props) => ({
  post: getPost(state, props.match.params.postId)
}); 

Post = withRouter(connect(
  mapStateToProps,
  { 
    fetchPost,
    deletePost
  }
)(Post));

export default Post;
