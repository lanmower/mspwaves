import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import NotFound from './NotFound';
import Typography from '@material-ui/core/Typography';
import modules from './modules/clientModules';
import CssBaseline from '@material-ui/core/CssBaseline';
class Index extends React.Component {
  render() {
    return (
      <div className="Index">
        {this.props.title}
      </div>
    );
  }
}

const AppRouter = props => {
  const routes = [];
  for(const moduleIndex in modules) {
    const module = modules[moduleIndex];
    if(module.routes) {
      for(const routeIndex in module.routes) {
        routes.push(module.routes[routeIndex]);
      }
    }
  }
  var x = 0;
  return (
  !props.loading ?
    <div>
      <CssBaseline />
    <Router>
      <Switch>
        {routes.map((route) =><Route exact key={x++} path={route.path} component={route.component} {...props} />)}
        <Route component={NotFound} />
      </Switch>
    </Router>    </div> : <Typography type="body1" component="p">Loading</Typography>

)};


const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

const schedule = [];
let index = 0;
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date();
for(let x = 0; x < 84; x++) {
  schedule.push(  {
    index:index++,
    title:"Steemit Musicians"+index,
    hosts:"@isaria, @krystle, and @swelker101",
    image: "http://mspwaves.com/wp-content/uploads/2017/10/steemit_musicians.jpg",
    description:"Join @isaria, @krystle, and @swelker101 on MSP Waves every Sunday night as they play the Top 5 Judge's pics from the weekly Steemit Open Mic Contest.",
  });
}
for(let x = 0; x < schedule.length; x++) {
  date.setDate(date.getDate() - date.getDay());
  date.setHours(0);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset() + (x * 120));
  schedule[x].day = dayNames[date.getDay()];
  schedule[x].hour = date.getHours();
}

const AppContainer = createContainer(() => {
  Meteor.call()
  Session.set("schedule", schedule);
  return {};
}, AppRouter);

render(<AppContainer />, document.getElementById('app'));
