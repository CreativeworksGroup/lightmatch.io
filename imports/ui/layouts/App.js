import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import AppNavigation from '../components/AppNavigation';
import Index from '../pages/Index';
import Privacy from '../pages/Privacy';
import License from '../pages/License';
import Terms from '../pages/Terms';
import Subscribe from '../pages/Subscribe';
import Agreement from '../pages/Agreement';
import NotFound from '../pages/NotFound';
// import Authenticated from '../pages/Authenticated';

const styles = theme => ({
  root: {
    marginTop: 100,
    // padding: theme.spacing.unit,
    // [theme.breakpoints.up('md')]: {
    //   backgroundColor: theme.palette.primary[500],
    // },
    // [theme.breakpoints.down('md')]: {
    //   backgroundColor: theme.palette.secondary.A400,
    // },
  },
});

const App = props => (
  <Router>
    <div className={props.classes.root}>
      {<AppNavigation />}
      <Switch>
        <Route exact name="index" path="/" component={Index} />
        <Route exact name="privacy" path="/privacy/" component={Privacy} />
        <Route exact name="license" path="/license/" component={License} />
        <Route exact name="terms" path="/terms/" component={Terms} />
        <Route exact name="subscribe" path="/subscribe/" component={Subscribe} />
        <Route exact name="agreement" path="/agreement/" component={Agreement} />
        {/* <Authenticated exact path="/:user" component={Index} {...classes} />
        <Authenticated exact path="/documents" component={Documents} {...appProps} />
        <Authenticated exact path="/documents/new" component={NewDocument} {...appProps} />
        <Authenticated exact path="/documents/:_id" component={ViewDocument} {...appProps} />
        <Authenticated exact path="/documents/:_id/edit" component={EditDocument} {...appProps} />
        <Public path="/signup" component={Signup} {...appProps} />
        <Public path="/login" component={Login} {...appProps} />
        <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
        <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} /> */}
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
};

const enhance = compose(
  withStyles(styles),
  withTracker((props) => {
    // Do all your reactive data access in this method.
    // Note that this subscription will get cleaned up when your component is unmounted
    const handle = Meteor.subscribe('todoList', props.id);
    return {
      currentUser: Meteor.user(),
      listLoading: !handle.ready(),
    };
  }),
);

export default enhance(App);
