import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, RaisedButton, IconButton } from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';
import {Row, Col} from 'react-flexbox-grid';

export const HeaderToolbar = () => (
  <Toolbar>
    <ToolbarGroup>
      <Link to="/">
        <IconButton>
          <ActionHome />
        </IconButton>
      </Link>
    </ToolbarGroup>
    <ToolbarGroup>
      <Link to="/post/add">
        <RaisedButton label="Add post" primary />
      </Link>
    </ToolbarGroup>
  </Toolbar>
)