import React from 'react';

const NoMatch = ({what = 'Page'}) => (
  <div className="no-match">
    <h3>{what} doesn't exist :'(</h3>
    <img src="/cry.png" alt="do not cry" />
  </div>
)

export default NoMatch;