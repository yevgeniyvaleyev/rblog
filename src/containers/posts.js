import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
      this.fetchPosts(categoryName);
    }
  }

  componentDidMount () {
    this.fetchPosts(this.props.match.params.categoryName);
  }

  fetchPosts (categoryName) {
    this.props.fetchPosts(categoryName);
    this.setState({
      categoryName
    });
  }

  render() {
    const { posts } = this.props;
    return posts ? (
      <PostsList posts={posts} />
    ) : (
      <em>Loading posts...</em>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: getPosts(state)
}); 

Posts = withRouter(connect(
  mapStateToProps,
  { fetchPosts }
)(Posts));

export default Posts;
