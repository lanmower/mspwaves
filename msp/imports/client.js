import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import NotFound from './NotFound';
import Typography from '@material-ui/core/Typography';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import modules from './modules/clientModules';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavigationPage from './modules/crud/client/components/NavigationPage';
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
        <Route exact path="/" component={ NavigationPage(Index)} {...props} />
        <Route component={NotFound} />
      </Switch>
    </Router>    </div> : <Typography type="body1" component="p">Loading</Typography>

)};

AppRouter.propTypes = {
  loading: PropTypes.bool.isRequired
};

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

const AppContainer = createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name =
    user &&
    user.profile &&
    user.profile.name &&
    getUserName(user.profile.name);
  const
    emailAddress = user &&
    user.emails &&
    user.emails[0].address;
  const { connected } = Meteor.status();
  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
    connected: connected
  };
}, AppRouter);

render(<AppContainer />, document.getElementById('app'));
