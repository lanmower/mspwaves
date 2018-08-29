import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const AddButton = (history, Collection) => {
    return (<IconButton aria-label="add" style={{color:"white"}} onClick={()=>{history.push('/'+Collection._name+'/new')}}>
      <AddIcon />
    </IconButton>);
}
export default AddButton;
