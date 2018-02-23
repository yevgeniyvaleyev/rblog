import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid'
import { HeaderToolbar } from './components/header-toolbar';
import Categories from './containers/categories';
import './App.css';
import Posts from './containers/posts';
import Post from './containers/post';
import ManagePost from './containers/manage-post';
import NoMatch from './components/no-match';

export default class App extends Component {
  render() {
    return (
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <Paper className="header-container" zDepth={1}>
                <HeaderToolbar />
              </Paper>
            </Col>
          </Row>
          <Row>
            <Col md={3} sm={2}>
              <Categories />
            </Col>
            <Col md={9} sm={10}>
              <Switch>
                <Route path='/' exact component={Posts} />
                <Route path='/post/add' exact component={ManagePost} />
                <Route path='/post/edit/:postId' exact component={ManagePost} />
                <Route path='/:categoryName' exact component={Posts} />
                <Route path='/:categoryName/:postId'  component={Post} />
                <Route component={NoMatch} />
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
