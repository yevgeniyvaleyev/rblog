import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchPosts } from '../actions';
import { getPosts, getCategories, arePostsLoading } from '../reducers';
import { PostsList } from '../components/posts-list';
import { Route } from 'react-router-dom';
import NoMatch from '../components/no-match';

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
    const { posts, match, isValidCategory, arePostsLoading } = this.props;

    if (!isValidCategory && !arePostsLoading) {
      return <NoMatch what="Category" />
    }

    return posts ? (
        <PostsList 
          categoryName={match.params.categoryName}
          posts={posts} />
    ) : (
      <em>Loading posts...</em>
    )
  }
}

const mapStateToProps = (state, props) => ({
  posts: getPosts(state),
  arePostsLoading: arePostsLoading(state),
  isValidCategory: getCategories(state)
    .map(data => data.name)
    .includes(props.match.params.categoryName)
}); 

Posts = withRouter(connect(
  mapStateToProps,
  { fetchPosts }
)(Posts));

export default Posts;
