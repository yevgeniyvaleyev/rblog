import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { getPosts } from '../reducers';
import { PostsList } from '../components/posts-list';

class Posts extends Component {

  state = {
    categoryName: ''
  };

  componentWillReceiveProps (props) {
    const { categoryName } = props.match.params;
    
    if (categoryName !== this.state.categoryName) {
      this.props.fetchPosts(categoryName);
      this.setState({
        categoryName
      });
    }
  }

  render() {
    const { posts } = this.props;
    return posts && posts.length > 0 ? (
      <PostsList posts={posts} />
    ) : (
      <em>Loading posts...</em>
    )
  }
}
Posts.propTypes = {
  
};

const mapStateToProps = (state) => ({
  posts: getPosts(state)
}); 

Posts = connect(
  mapStateToProps,
  { fetchPosts }
)(Posts);

export default Posts;
