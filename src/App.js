import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Paper } from 'material-ui';
import { HeaderToolbar } from './components/header-toolbar';
import Categories from './containers/categories';
import './App.css';
import { Category } from './components/category';

const style = {
  height: '100%',
  width: '80%',
  minWidth: '550px',
  margin: '0 auto',
};

export default class App extends Component {
  render() {
    return (
      <div>
        <Paper style={style} zDepth={1}>
          <HeaderToolbar />
        </Paper>
        <Paper>
          <table>
            <tr>
              <td>
              <Categories />
              </td>
              <td>
              <Switch>
                <Route path='/category/:name' component={Posts}/>
                <Redirect from='/' exact to='/category/react'/>
              </Switch>
              </td>
            </tr>
          </table>
          </Paper>
      </div>
    );
  }
}

App.propTypes = {
  params: PropTypes.object,
  children: PropTypes.object,
};
