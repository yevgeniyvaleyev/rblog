import React from 'react';
import { IconButton } from 'material-ui';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';

const dynamicTextAttribute = (name, value) => {
  const data = {};
  if (value) {
    data[name] = '' + value;
  }
  return data;
}

export const Voter = ({onUp, onDown, current}) => (
  <div className="voter">
    <IconButton 
      onClick={() => onUp()} 
      {...dynamicTextAttribute('primary', current === 1)}
      iconStyle={{color: current === 1 ? '#00bcd5' : '#ccc'}}>
        <ActionThumbUp />
    </IconButton>
    <IconButton 
      onClick={() => onDown()} 
      {...dynamicTextAttribute('primary', current === -1)}
      iconStyle={{color: current === -1 ? '#00bcd5' : '#ccc'}}>
        <ActionThumbDown />
    </IconButton>
  </div>
)