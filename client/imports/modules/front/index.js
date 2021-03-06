import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

window.Schedule =  new Mongo.Collection("schedule");

if(Meteor.isCordova) {
  cordova.plugins.notification.local.schedule({
      title: 'Design team meeting',
      text: '3:00 - 4:00 PM',
      trigger: { at: new Date(new Date().getTime()+10000) }
  });
}

const styles = theme => ({
  root: {
    margin: '5px',
    textAlign: 'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
    media: 'lq',
    audioImage: '',
    schedule: []
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  setMedia = panel => (type) => {
  };
  componentDidMount() {
    let index = 0;
    const date = new Date();
    Meteor.subscribe('schedule');
    date.setDate(date.getDate() - date.getDay());//sunday
    date.setHours(0);
    const time = new Date().getTime()-date.getTime();
    const weekTime = time-date.getTime();
    const schedule = Schedule.find({time : {$lt : weekTime}}).fetch();
    const current = schedule.shift();
    this.setState({audioDescription:current?current.description:'', audioImage:current?current.image:'', schedule})
  }

  render() {
    const { classes, inputSchedule, match, history } = this.props;
    const { expanded, media, schedule, audioImage, audioDescription } = this.state

    const self = this;
    return (
      <div className={classes.root}>
        <img src="/logo.png" style={{maxWidth:"100%"}}/>
        <div>
        <div style={{display:"inline-block", maxWidth:"800px"}}>
        <img src={audioImage} style={{width: "100%",display:(media=='lq'||media=='hq')?'block':'none', marginBottom:"-5px"}}/>
        <div>
        <div style={{display:"inline-block", position:"relative", width:"100%"}}>
          {media=='hq'?<audio controls style={{width: "100%", verticalAlign:"top"}}>
            <source src="http://178.63.128.13:8000/live320.mp3?_=1" type="audio/mpeg"/>
          </audio>:null}
          {media=='lq'?<audio controls style={{width: "100%", verticalAlign:"top"}}>
            <source src="http://178.63.128.13:8000/live.mp3?_=1" type="audio/mpeg"/>
          </audio>:null}
        </div>
        <div style={{display:"inline-block", margin:"20px"}}>
        <Button variant="contained" color={(media=='hq')?'secondary':'primary'}  onClick={()=>{this.setState({media: 'hq'})}}>HQ</Button>
        <Button variant="contained" color={(media=='lq')?'secondary':'primary'}  onClick={()=>{this.setState({media: 'lq'})}}>LQ</Button>
        <Button variant="contained" color={(media=='vid')?'secondary':'primary'}  onClick={()=>{this.setState({media: 'vid'})}}>VIDEO</Button>
        </div>
        </div>
        </div>
        <Typography style={{margin:"20px"}}>
          {audioDescription}
        </Typography>
        </div>
        {schedule.map((item)=>
          <ExpansionPanel key={item.index} expanded={expanded === item.index} onChange={self.handleChange(item.index)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{item.title}</Typography>
              <Typography className={classes.secondaryHeading}>{item.day} {item.hour}:00</Typography>
            </ExpansionPanelSummary>
            <img src={item.image} style={{maxWidth:"100%"}}/>
            <ExpansionPanelDetails>
              <Typography>
                {item.description}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>:null
        )}
        </div>
    );
  }
}
export default {
    routes: [
        {
            path: "/", component: withStyles(styles)(ControlledExpansionPanels)
        }
    ]
};
