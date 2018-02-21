import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { SelectField, MenuItem, CardText, Card, List, ListItem } from 'material-ui';
import { byTimestamp, byVotes } from '../utils/sorters';

const sorting = {
  votes: 1,
  time: 2,
  none: 3
}

export class PostsList extends Component {
  
  state = {
    sortBy: sorting.none
  }

  handleSort = (event, index, value) => this.setState({sortBy: value});

  sortPosts (posts) {
    const clone = [...posts];
    
    if (this.state.sortBy === sorting.votes) {
      clone.sort(byVotes);
    }
    if (this.state.sortBy === sorting.time) {
      clone.sort(byTimestamp);
    }
    return clone;
  }

  render () {
    const { posts, categoryName } = this.props;
    
    if (posts.length === 0) {
      return (
        <Card>
          <CardText>yet no posts...</CardText>
        </Card>
      )
    }
    
    return (
      <div>
        <SelectField 
          value={this.state.sortBy} 
          floatingLabelText="Sort by"
          onChange={this.handleSort}>
            <MenuItem value={1} primaryText="Votes" />
            <MenuItem value={2} primaryText="Time" />
            <MenuItem value={3} primaryText="None" />
        </SelectField>

        <List className="posts-list">
          {this.sortPosts(posts).map((post) => (
            <NavLink key={post.id} to={{ pathname: `/${categoryName}/${post.id}` }}>
              <ListItem 
                primaryText={post.title}>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    )
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  categoryName: PropTypes.string.isRequired
};