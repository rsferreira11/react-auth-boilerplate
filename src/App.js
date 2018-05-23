import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Welcome from './components/Welcome/Welcome';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import * as actions from './store/actions/index';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  getPublicRoutes() {
    return (
      <Switch>
        <Route path='/' exact render={() => <Welcome isAuthenticated={this.props.isAuthenticated} />} />
        <Route path='/auth' component={asyncAuth} />
        <Redirect to="/" /> {/* GUARD! if no route is matched redirect to index */}
      </Switch>
    );
  }

  getAuthorizedRoutes() {
    return (
      <Switch>
        <Route path='/' exact render={() => <Welcome isAuthenticated={this.props.isAuthenticated} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={asyncAuth} />
        <Redirect to="/" /> {/* GUARD! if no route is matched redirect to index */}
      </Switch>
    );
  }

  render() {
    const routes = this.props.isAuthenticated
      ? this.getAuthorizedRoutes()
      : this.getPublicRoutes();

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
