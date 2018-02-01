import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Grid>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Grid>
    </MuiThemeProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
