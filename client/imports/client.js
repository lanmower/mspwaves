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


const AppContainer = createContainer(() => {
  return {};
}, AppRouter);

render(<AppContainer />, document.getElementById('app'));
