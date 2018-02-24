import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from 'material-ui';
import ManageVotes from '../containers/manage-votes';
import CommentsInfo from '../containers/comments-info';
import { ScoreAvatar } from './score-avatar';
import { ConfirmDialog } from './confirm-dialog';
import { NavLink } from 'react-router-dom';
import { IconButton } from 'material-ui';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

export class PostDetailsShort extends Component {
  
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
      <Card className="short-post-details">
        <CardHeader
          avatar={<ScoreAvatar score={post.voteScore} />}
          title={
            <span className="title-container">
              <b>{post.title}</b> by {post.author} | <CommentsInfo postId={post.id} />
            </span>
          }
          children={
            <div className="sub-controls">
              <ManageVotes 
                type='post' 
                id={post.id} />
              <Link to={`/post/edit/${post.id}`}>
                <IconButton label="Edit">
                  <ActionEdit />
                </IconButton>
              </Link>
              <IconButton label="Delete" onClick={this.requestDeleteConfirmation}>
                <ActionDelete />
              </IconButton>
            </div>
          }
          subtitle={
            <span>
              {moment(post.timestamp).format('MMMM Do YYYY, h:mm a')}<br />
              <NavLink key={post.id} to={{ pathname: `/${post.category}/${post.id}` }}>Read more</NavLink>
            </span>
          }
        />
        <ConfirmDialog 
            activate={this.state.activateDeleteConfirm}
            message="Delete post?"
            onConfirm={this.removePost}
        />
      </Card>
    )
  }
}

PostDetailsShort.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};