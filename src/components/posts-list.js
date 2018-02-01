import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { DropDownMenu, MenuItem, List, ListItem } from 'material-ui';
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
    const { posts } = this.props;
    
    if (posts.length === 0) {
      return (
        <div>Empty list</div>
      )
    }
    
    return (
      <div>
        <DropDownMenu value={this.state.sortBy} onChange={this.handleSort}>
          <MenuItem value={1} primaryText="Votes" />
          <MenuItem value={2} primaryText="Time" />
          <MenuItem value={3} primaryText="None" />
        </DropDownMenu>

        <List className="posts-list">
          {this.sortPosts(posts).map((post) => (
              <ListItem 
                primaryText={post.title}
                secondaryText={
                  <NavLink to={{ pathname: `/post/${post.id}` }}>
                    Read more
                  </NavLink>
                }
                key={post.id}>
              </ListItem>
            ))}
        </List>
      </div>
    )
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
};