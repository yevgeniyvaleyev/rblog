import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CategoriesList } from '../components/categories-list';
import { fetchCategories } from '../actions';
import { getCategories } from '../reducers';

class Categories extends Component {

  componentDidMount () {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;
    return categories && categories.length > 0 ? (
      <CategoriesList 
        categories={categories} />
    ) : (
      <em>Loading categories...</em>
    )
  }
}
Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  categories: getCategories(state)
}); 

Categories = connect(
  mapStateToProps,
  { fetchCategories }
)(Categories);

export default Categories;
