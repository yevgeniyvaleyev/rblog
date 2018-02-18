import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addComment, fetchComment, updateComment } from '../actions';
import { EditComment } from '../components/edit-comment';
import { getComment } from '../reducers'

class ManageComment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comment: {}
    };
  }

  addNewComment (newCommentData, postId) {
    const data = {
      id: 'a' + Math.random(),
      timestamp: Date.now(),
      author: 'Barmaley',
      parentId: postId
    }
    this.props.addComment({
      ...data, 
      ...newCommentData
    }).then(() => {
      this.props.history.push(`/post/${postId}`)
    })
  }

  updateComment (commentData, commentId, postId) {
    this.props.updateComment({
      ...commentData
    }, commentId).then(() => {
      this.props.history.push(`/post/${postId}`)
    })
  }

  manageComment (filledData) {
    const { commentId, postId } = this.props.match.params;
    
    commentId
      ? this.updateComment(filledData, commentId, postId)
      : this.addNewComment(filledData, postId)
  }

  cancelEdit () {
    const { commentId, postId } = this.props.match.params;

    commentId
      ? this.props.history.push(`/post/${postId}`)
      : this.props.history.goBack()
  }

  getComment (id) {
    const { commentId, fetchComment } = this.props.match.params;
    
    fetchComment(commentId);
  }

  componentDidMount () {
    const { commentId } = this.props.match.params;
    const { comment } = this.props;

    if (!comment && commentId) {
      this.getComment(commentId);
    }
  }

  shouldRender (props) {
    const { commentId } = props.match.params;
    const { comment } = props;

    return commentId ? !!comment : true;
  }

  shouldComponentUpdate(nextProps) {
    return this.shouldRender(nextProps)
  }

  render() {
    const comment = this.props.comment || {};
    const { body } = comment;

    if (!this.shouldRender(this.props)) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <EditComment 
        body={body || ''}
        onCancel={this.cancelEdit.bind(this)}
        onUpdate={this.manageComment.bind(this)} />
    )
  }
}

const mapStateToProps = (state, props) => ({
  comment: getComment(state, props.match.params.commentId)
}); 

ManageComment = withRouter(connect(
  mapStateToProps,
  { 
    addComment,
    updateComment,
    fetchComment
  }
)(ManageComment));

export default ManageComment;
