import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@material-ui/lab/Slider';

export default ({field, state, onChange})=>{
  return (<div><FormLabel>{field.label}</FormLabel><Slider
      min={field.min}
      max={field.max}
      step={field.step}
      value={state[field.name]}
      onChange={onChange}
  />
  <FormLabel>{value}</FormLabel></div>);
}
