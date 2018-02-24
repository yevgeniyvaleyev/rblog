import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchPosts, deletePost } from '../actions';
import { getPosts, getCategories, arePostsLoading } from '../reducers';
import { PostsList } from '../components/posts-list';
import NoMatch from '../components/no-match';

class PostsShortNav extends Component {

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
      arePostsLoading, 
    } = this.props;

    return posts ? (
        <div>ff</div>
    ) : (
      <em>Loading post links...</em>
    )
  }
}

const mapStateToProps = (state, {categoryName}) => ({
  posts: getPosts(state, categoryName),
  arePostsLoading: arePostsLoading(state)
}); 

PostsShortNav = withRouter(connect(
  mapStateToProps,
  { fetchPosts }
)(PostsShortNav));

export default Posts;
