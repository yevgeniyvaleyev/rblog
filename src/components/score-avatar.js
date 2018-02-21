import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'material-ui';

export const ScoreAvatar = ({score}) => (
  <Avatar 
    size={30}
    className={`avatar ${score > 0 ? 'positive' : score < 0 ? 'negative' : ''}`}>
      {score}
  </Avatar>
)

ScoreAvatar.propTypes = {
  score: PropTypes.number.isRequired
};