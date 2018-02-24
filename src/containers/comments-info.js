import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComments } from '../actions';
import { getComments } from '../reducers';
import { pluralizer } from '../utils/text-formaters'

class CommentsInfo extends Component {

  componentDidMount () {
    const { postId } = this.props;
    
    this.props.fetchComments(postId);
  }

  getPlurals

  render() {
    const { count } = this.props;
    return (
      <span>{count} {pluralizer('Comment', count)}</span>
    )
  }
}
CommentsInfo.propTypes = {
  postId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  count: getComments(state).length
}); 

CommentsInfo = connect(
  mapStateToProps,
  { fetchComments }
)(CommentsInfo);

export default CommentsInfo;
