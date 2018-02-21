import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
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
      <List className="categories-list">
        {categories.map((category) => (
          <NavLink 
            key={category.name}
            activeStyle={{ fontWeight: 'bold' }}
            to={{ pathname: `/${category.name}` }}>
              <ListItem>
                {capitalize(category.name)}
              </ListItem>
            </NavLink>
          ))}
      </List>
    )
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired
};