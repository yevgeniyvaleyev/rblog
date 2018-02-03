import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Row, Col} from 'react-flexbox-grid'
import { Card, Dialog, CardHeader, CardText, CardActions, RaisedButton, FlatButton } from 'material-ui';
import Comments from '../containers/comments';
import { ScoreAvatar } from './score-avatar';
import { deletePost } from '../actions/index';

export class PostDetails extends Component {
  
  state = {
    removeDialog: {
      open: false
    }
  };

  requestDeleteConfirmation = () => {
    this.setState({
      removeDialog: {open: true}
    });
  };

  removePost = (id) => {
    this.props
      .deletePost(id)
      .then(this.hideDialog)
      .then(this.props.goBack)
  }

  hideDialog = () => {
    this.setState({
      removeDialog: {open: false}
    });
  };

  render () {
    const { post } = this.props;
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
        onClick={this.removePost.bind(this, post.id)}
      />
    ];

    return (
      <Card>
        <CardHeader
          avatar={<ScoreAvatar score={post.voteScore} />}
          title={post.author}
          subtitle={moment(post.timestamp).format('MMMM Do YYYY, h:mm a')}
        />
        <CardText>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </CardText>
        <CardActions>
          <Row>
            <Col lg={9}>
              <RaisedButton primary={true} label="Add comment" />
            </Col>
            <Col lg={3}>
              <FlatButton label="Delete" onClick={this.requestDeleteConfirmation} />
              <FlatButton label="Edit" />
            </Col>
          </Row>
        </CardActions>
        <CardText>
          <h4>Comments:</h4>
        </CardText>
        <Comments postId={post.id} />
        <Dialog
            actions={removeDialogActions}
            modal={false}
            open={this.state.removeDialog.open}
            onRequestClose={this.hideDialog}
          >
            Delete post?
          </Dialog>
      </Card>
    )
  }
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
};