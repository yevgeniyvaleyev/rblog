import React from 'react';
import { IconButton } from 'material-ui';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';

export const Voter = ({onUp, onDown, current}) => (
  <div className="voter">
    <IconButton 
      onClick={() => onUp()} 
      primary={current === 1}
      iconStyle={{color: current === 1 ? '#00bcd5' : '#ccc'}}>
        <ActionThumbUp />
    </IconButton>
    <IconButton 
      onClick={() => onDown()} 
      iconStyle={{color: current === -1 ? '#00bcd5' : '#ccc'}}
      primary={current === -1}>
        <ActionThumbDown />
    </IconButton>
  </div>
)