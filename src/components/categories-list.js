import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import { capitalize } from '../utils/text-formaters';
import { NavLink } from 'react-router-dom';

export class CategoriesList extends Component {
  
  render () {
    const { categories } = this.props;
    
    if (categories.length === 0) {
      return (
        <div>Empty list</div>
      )
    }
    
    return (
      <ul className="categories-list">
        {categories.map((category) => (
            <li key={category.name}>
              <NavLink 
                activeStyle={{ fontWeight: 'bold' }}
                to={{ pathname: `/category/${category.name}` }}>
                  {capitalize(category.name)}
              </NavLink>
            </li>
          ))}
      </ul>
    )
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired
};