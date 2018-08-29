import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';
import ImageSelect from './ImageSelect.js';
export default ({field, state, onChange})=>{
  return (<div><FormLabel>{field.label}</FormLabel><ImageSelect
      options={field.options}
      path={field.path}
      value={state[field.name]}
      onChange={onChange}
  /></div>);
}
