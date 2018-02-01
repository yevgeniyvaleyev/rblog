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
            <ListItem key={category.name}>
              <NavLink 
                activeStyle={{ fontWeight: 'bold' }}
                to={{ pathname: `/category/${category.name}` }}>
                  {capitalize(category.name)}
              </NavLink>
            </ListItem>
          ))}
      </List>
    )
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired
};