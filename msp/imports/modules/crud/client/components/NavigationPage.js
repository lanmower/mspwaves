import React from 'react';
import Loading from './Loading';
import Navigation from './Navigation';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

let handleSubmit = ()=>{};
const styles = theme => ({
  root: {
    paddingLeft: "1em",
    paddingRight: "1em",
    maxWidth:800,
    marginLeft:"auto",
    marginRight:"auto"
  }
});
export default (View) => {
    return withStyles(styles)((props)=>{
      const { classes } = props;
      return <div className={props.config?props.config.name:""}>
              <Navigation {...props} />
              <Paper elevation={0} className={classes.root}>
            {!props.loading?<View {...props}/>:<Loading/>}
            </Paper>
        </div>
  })
};
