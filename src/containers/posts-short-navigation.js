import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchPosts } from '../actions';
import { getPosts, arePostsLoading, getAllPosts } from '../reducers';
import { NavLink } from 'react-router-dom';

class PostsShortNav extends Component {

  componentDidMount () {
    this.props.fetchPosts(this.props.categoryName || '');
  }

  render() {
    const { 
      posts,  
      arePostsLoading, 
    } = this.props;

    if (arePostsLoading) {
      return <em>Loading post links...</em>
    }
    return (
      <div className="posts-navigation">
        <h4>All posts:</h4>
        <ul>
          {posts.map((post, index) => (
            <li key={post.id}>
              <NavLink 
                key={post.id} 
                to={{ pathname: `/${post.category}/${post.id}` }}>
                  {post.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, {categoryName}) => ({
  posts: !categoryName ? 
    getAllPosts(state) : 
    getPosts(state, categoryName),
  arePostsLoading: arePostsLoading(state)
}); 

PostsShortNav = withRouter(connect(
  mapStateToProps,
  { fetchPosts }
)(PostsShortNav));

export default PostsShortNav;
