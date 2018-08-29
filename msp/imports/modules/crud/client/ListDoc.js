import React from 'react';
  import List from '@material-ui/core/List';
  import ListItem from '@material-ui/core/ListItem';
  import ListItemText from '@material-ui/core/ListItemText';
  import IconButton from '@material-ui/core/IconButton';
  import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

const render = ({ match, history, info, collection, _id }) => {
  const {primary, secondary, extra} = info;
    return (
      <ListItem button onClick={() => history.push(`${match.url}/${_id}`)} key={_id}>
        <Typography type="body1" component="p">
        {extra}
        </Typography>
        <ListItemText primary={primary} secondary={secondary} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => handleRemove(_id, collection)} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
  export default render;
