import React from 'react';

import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';

export default ({field, state, onChange})=>{
  return (<div><FormLabel>{field.label}</FormLabel><Select
      options={field.options}
      value={state[field.name]}
      onChange={onChange}
  /></div>);
}
