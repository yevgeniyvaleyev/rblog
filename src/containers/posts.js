import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchPosts, deletePost } from '../actions';
import { getPosts, getCategories, getAllPosts, arePostsLoading } from '../reducers';
import { PostsList } from '../components/posts-list';
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
    const { 
      posts, 
      isValidCategory, 
      arePostsLoading, 
      deletePost
    } = this.props;

    if (!isValidCategory && !arePostsLoading) {
      return <NoMatch what="Category" />
    }

    return posts ? (
        <PostsList
          deletePost={deletePost}
          posts={posts} />
    ) : (
      <em>Loading posts...</em>
    )
  }
}

const mapStateToProps = (state, props) => ({
  posts: !props.match.params.categoryName ? 
    getAllPosts(state) : 
    getPosts(state, props.match.params.categoryName),
  arePostsLoading: arePostsLoading(state),
  isValidCategory: getCategories(state)
    .map(data => data.name)
    .includes(props.match.params.categoryName) || 
    props.match.params.categoryName === undefined
}); 

Posts = withRouter(connect(
  mapStateToProps,
  { fetchPosts, deletePost }
)(Posts));

export default Posts;
