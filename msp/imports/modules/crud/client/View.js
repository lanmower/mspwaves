import React from 'react';
import NotFound from "./components/NotFound";
import getElement from './modules';
import Loading from './components/Loading';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    padding: "1em",
    minWidth:600,
    maxWidth:800,
    marginLeft:"auto",
    marginRight:"auto"
  }
});
class ViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const {navButtonStore, collections, match, doc, history} = this.props;
    navButtonStore.set(<div>
      <IconButton className="raised" style={{color:"white"}} onClick={() => handleRemove(doc._id, history)} aria-label="Delete">
          <DeleteIcon />
      </IconButton>
      <IconButton className="raised" style={{color:"white"}} onClick={() => history.push(`${match.url}/edit`)} aria-label="Delete">
          <EditIcon />
      </IconButton>
    </div>)
  }

  render() {
    const {
      doc, match, history, loading, collection, classes, config
    } = this.props;

  const {schema} = config
  console.log(doc);
  return (doc ? (
    <div className="View">
      <Paper elevation={0} className={classes.root}>
      {loading ? "Loading..." : (<div>
          {
            schema.map((field)=>{
              const value = doc[field.name];
              field.view = 'view';
              const customElement = getElement({field, value});
              return (
                <div key={field.name}>
                 {customElement}
                </div>
              )
            })
          }
      </div>
      )}
      </Paper>
      </div>

  ) : <NotFound />);
}
};


export default withStyles(styles)(ViewComponent);
