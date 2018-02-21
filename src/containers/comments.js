import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchComments, deleteComment } from '../actions';
import { getComments } from '../reducers';
import { CommentsList } from '../components/comments-list';

class Comments extends Component {

  componentDidMount () {
    const { postId } = this.props;
    
    this.props.fetchComments(postId);
  }

  render() {
    const { comments } = this.props;
    return (
      <CommentsList 
        postId={this.props.postId}
        deleteComment={this.props.deleteComment}
        comments={comments || []} />
    )
  }
}
Comments.propTypes = {
  postId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  comments: getComments(state)
}); 

Comments = withRouter(connect(
  mapStateToProps,
  { 
    fetchComments,
    deleteComment
  }
)(Comments));

export default Comments;
