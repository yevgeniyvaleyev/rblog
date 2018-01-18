import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CategoriesList } from '../components/categories-list';
import { fetchCategories } from '../actions';
import { getCategories } from '../reducers';
import { Redirect } from 'react-router-dom';

class Posts extends Component {

  componentDidMount () {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;
    return categories && categories.length > 0 ? (
      <CategoriesList 
        categories={categories} />
    ) : (
      <em>Loading...</em>
    )
  }
}
Posts.propTypes = {
  
};

const mapStateToProps = (state) => ({
  posts: getPosts()
}); 

Posts = withRouter(connect(
  mapStateToProps,
  { fetchPosts }
)(Posts));

export default Posts;
