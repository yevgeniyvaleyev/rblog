import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Row, Col} from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardText, CardActions, RaisedButton, FlatButton } from 'material-ui';
import Comments from '../containers/comments';
import ManageVotes from '../containers/manage-votes';
import { ScoreAvatar } from './score-avatar';
import { ConfirmDialog } from './confirm-dialog';

export class PostDetails extends Component {
  
  state = {
    activateDeleteConfirm: false
  };

  requestDeleteConfirmation = () => {
    this.setState({
      activateDeleteConfirm: true
    });
  };

  removePost = () => 
    this.props
      .deletePost(this.props.post.id)
      .then(this.props.goBack)

  render () {
    const { post } = this.props;

    return (
      <Card>
        <CardHeader
          avatar={<ScoreAvatar score={post.voteScore} />}
          title={post.author}
          children={
            <ManageVotes 
              type='post' 
              id={post.id} />
          }
          subtitle={moment(post.timestamp).format('MMMM Do YYYY, h:mm a')}
        />
        <CardText>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </CardText>
        <CardActions>
          <Row>
            <Col sm={6} lg={8}>
              <Link to={`/${post.category}/${post.id}/comment`}>
                <RaisedButton primary={true} label="Add comment" />
              </Link>
            </Col>
            <Col sm={6} lg={4}>
              <FlatButton label="Delete" onClick={this.requestDeleteConfirmation} />
              <Link to={`/post/edit/${post.id}`}>
                <FlatButton label="Edit" />
              </Link>
            </Col>
          </Row>
        </CardActions>
        <Comments postId={post.id} />
        
        <ConfirmDialog 
            activate={this.state.activateDeleteConfirm}
            message="Delete post?"
            onConfirm={this.removePost}
        />
      </Card>
    )
  }
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
};