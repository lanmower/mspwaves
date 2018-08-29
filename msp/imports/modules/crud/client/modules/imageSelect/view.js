import React from 'react';

export default ({field, state, onChange})=>{
  return (<div><b>{field.label}</b>:{state[field.name]}</div>);
}
