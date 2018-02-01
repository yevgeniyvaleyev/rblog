import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'material-ui';

export const ScoreAvatar = ({score}) => (
  <Avatar
    backgroundColor={score > 0 ? 'green' : score < 0 ? 'red' : 'grey'}>
      {score}
  </Avatar>
)

ScoreAvatar.propTypes = {
  score: PropTypes.number.isRequired
};