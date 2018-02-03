import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'
import { Paper } from 'material-ui';
import {Row, Col} from 'react-flexbox-grid'
import { HeaderToolbar } from './components/header-toolbar';
import Categories from './containers/categories';
import './App.css';
import Posts from './containers/posts';
import Post from './containers/post';

const style = {
  marginBottom: '20px',
};

export default class App extends Component {
  render() {
    return (
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <Paper style={style} zDepth={1}>
                <HeaderToolbar />
              </Paper>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <Categories />
            </Col>
            <Col lg={9}>
              <Switch>
                <Route path='/category/:categoryName' component={Posts}/>
                <Route path='/' exact component={Posts}/>
                <Route path='/post/:postId' component={Post}/>
              </Switch>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

App.propTypes = {
  params: PropTypes.object,
  children: PropTypes.object,
};
