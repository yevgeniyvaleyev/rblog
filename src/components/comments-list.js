import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ScoreAvatar } from './score-avatar';
import { ConfirmDialog } from './confirm-dialog';
import ManageVotes from '../containers/manage-votes';
import { pluralizer } from '../utils/text-formaters'

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

  renderHeader (comments) {
    return (
      <CardText>
        <h4>{comments.length} {pluralizer('Comment', comments.length)}:</h4>
      </CardText>
    )
  }

  render () {
    const { comments } = this.props;

    if (comments.length === 0) {
      return (
        <div>
          {this.renderHeader(comments)}
          <Card>
            <CardText>yet no comments...</CardText>
          </Card>
        </div>
      )
    }
    
    return (
        <div className="comments-list">
          {this.renderHeader(comments)}
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader
                avatar={<ScoreAvatar score={comment.voteScore} />}
                title={comment.author}
                children={
                  <ManageVotes 
                    type='comment' 
                    id={comment.id} />
                  }
                subtitle={moment(comment.timestamp).format('MMMM Do YYYY, h:mm a')}
              />
              <CardText>{comment.body}</CardText>
              <CardActions>
                <Link to={`${this.props.postId}/comment/${comment.id}`}>
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