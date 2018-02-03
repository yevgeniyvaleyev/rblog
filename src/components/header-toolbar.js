import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, RaisedButton } from 'material-ui';

export const HeaderToolbar = () => (
  <Toolbar>
    <ToolbarGroup>
      <Link to="/add-post">
        <RaisedButton label="Add post" primary />
      </Link>
    </ToolbarGroup>
  </Toolbar>
)