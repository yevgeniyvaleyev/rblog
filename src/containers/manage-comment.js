import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { addComment, fetchComment, updateComment } from '../actions';
import { EditComment } from '../components/edit-comment';
import { getComment, hasError } from '../reducers';

class ManageComment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comment: {}
    };
  }

  addNewComment (newCommentData) {
    const { categoryName, postId } = this.props.match.params;
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
      this.props.history.push(`/${categoryName}/${postId}`)
    })
  }

  updateComment (commentData) {
    const { categoryName, commentId, postId } = this.props.match.params;

    this.props.updateComment({
      ...commentData
    }, commentId).then(() => {
      this.props.history.push(`/${categoryName}/${postId}`)
    })
  }

  manageComment (filledData) {  
    const { commentId } = this.props.match.params;
  
    commentId
      ? this.updateComment(filledData)
      : this.addNewComment(filledData)
  }

  cancelEdit () {
    const { commentId, postId, categoryName } = this.props.match.params;

    commentId
      ? this.props.history.push(`/${categoryName}/${postId}`)
      : this.props.history.goBack()
  }

  getComment (id) {
    const { commentId } = this.props.match.params;
    
    this.props.fetchComment(commentId);
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
    const { comment, hasError } = props;

    return commentId ? !!comment || hasError : true;
  }

  shouldComponentUpdate(nextProps) {
    return this.shouldRender(nextProps)
  }

  render() {
    const comment = this.props.comment || {};
    const { body } = comment;

    if (this.props.hasError) {
      return (<Redirect to='/not-found' />)
    }

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

const mapStateToProps = (state, {match}) => ({
  comment: getComment(state, match.params.commentId),
  hasError: hasError(state, match.params.commentId)
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
