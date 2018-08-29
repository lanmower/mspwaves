import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListDoc from './ListDoc';
import { withStyles } from '@material-ui/core/styles';
import AddButton from './AddButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import pluralize from 'pluralize';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});
class ListComponent extends React.Component {

  handleUpload({submissionsCollection}) {
    return() => {
       Bert.alert(submissionsCollection._name+'Starting upload...', 'success');
       const docs = submissionsCollection.find().forEach((doc)=>{
         submissionsCollection.remove(doc._id);
         Meteor.call(submissionsCollection._name+'.insert', doc, (error, deckId) => {
           if (error) {
             Bert.alert(error.reason, 'danger');
           }
           else {
             Bert.alert(submissionsCollection._name+' uploaded!', 'success');
           }
         });
       });
     }
   }

   constructor(props) {
     super(props);
     this.state = {};
     const {navButtonStore, collection, history} = this.props;

     navButtonStore.set(<Link to={`${collection._name}/new`}><IconButton className="raised" style={{color:"white"}} aria-label="New"><AddIcon /></IconButton></Link>)
   }

  render() {
    const {
      docs, match, history, loading, collection, classes, config
    } = this.props;

    return <Paper className={classes.root} elevation={0}>
      {docs.length ? <List>
        {
          docs.map((doc)=>{
            const info = { key:doc._id,primary:config.listView.primary(doc),secondary:config.listView.secondary(doc),extra:config.listView.extra(doc)};
            return (
              <ListDoc key={doc._id} _id={doc._id} info={info} doc={doc} history={history} match={match} collection={collection}></ListDoc>)
            })
        }
      </List>
        :
         <Typography type="body1" component="div">
            No {pluralize(collection._name)} found.
          </Typography>
        }
    </Paper>


  }
}

export default withStyles(styles)(ListComponent);
