import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Dialog, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';
import moment from 'moment';
import { ScoreAvatar } from './score-avatar';
import { ConfirmDialog } from './confirm-dialog';

export class CommentsList extends Component {

  state = {
    removeDialog: {
      open: false
    },
    selectedCommentId: null
  };

  requestDeleteConfirmation = (id) => {
    this.setState({
      removeDialog: {open: true},
      selectedCommentId: id
    });
  };

  removeSelectedComment = () => {
    this.props
      .deleteComment(this.state.selectedCommentId)
      .then(this.hideDialog)
  }

  hideDialog = () => {
    this.setState({
      removeDialog: {open: false},
      selectedCommentId: null
    });
  };

  render () {
    const { comments } = this.props;
    const removeDialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.hideDialog.bind(this)}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onClick={this.removeSelectedComment.bind(this)}
      />
    ];

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
                <FlatButton label="Edit" />
                <FlatButton label="Delete" onClick={this.requestDeleteConfirmation.bind(null, comment.id)} />
              </CardActions>
            </Card>
          ))}
          <Dialog
            actions={removeDialogActions}
            modal={false}
            open={this.state.removeDialog.open}
            onRequestClose={this.hideDialog}
          >
            Delete comment?
          </Dialog>
        </div>
    )
  }
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired
};