import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        deleteComment={this.props.deleteComment}
        comments={comments || []} />
    )
  }
}
Comments.propTypes = {
  
};

const mapStateToProps = (state) => ({
  comments: getComments(state)
}); 

Comments = connect(
  mapStateToProps,
  { 
    fetchComments,
    deleteComment
  }
)(Comments);

export default Comments;
