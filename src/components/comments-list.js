import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ScoreAvatar } from './score-avatar';
import { ConfirmDialog } from './confirm-dialog';

export class CommentsList extends Component {

  state = {
    selectedCommentId: null,
    activateDeleteConfirm: false
  };

  requestDeleteConfirmation = (id) => {
    this.setState({
      selectedCommentId: id,
      activateDeleteConfirm: true
    });
  };

  removeSelectedComment = () =>
    this.props.deleteComment(this.state.selectedCommentId);

  deselectComment = () => {
    this.setState({
      selectedCommentId: null,
      activateDeleteConfirm: false
    });
  };

  render () {
    const { comments } = this.props;

    if (comments.length === 0) {
      return (
        <Card>
          <CardText>yet no comments...</CardText>
        </Card>
      )
    }
    
    return (
        <div className="comments-list">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader
                avatar={<ScoreAvatar score={comment.voteScore} />}
                title={comment.author}
                subtitle={moment(comment.timestamp).format('MMMM Do YYYY, h:mm a')}
              />
              <CardText>{comment.body}</CardText>
              <CardActions>
                <Link to={`/post/${this.props.postId}/comment/edit/${comment.id}`}>
                  <FlatButton label="Edit" />
                </Link>
                <FlatButton label="Delete" onClick={this.requestDeleteConfirmation.bind(null, comment.id)} />
              </CardActions>
            </Card>
          ))}
          <ConfirmDialog 
            activate={this.state.activateDeleteConfirm}
            message="Delete comment?"
            onConfirm={this.removeSelectedComment}
            onCancel={this.deselectComment}
          />
        </div>
    )
  }
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};