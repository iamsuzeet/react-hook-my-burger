import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

import Checkout from "./containers/Checkout/Checkout";
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route
          path="/auth"
          exact
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Auth />
            </Suspense>
          )}
        />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route
            path="/orders"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Orders />
              </Suspense>
            )}
          />
          <Route path="/logout" exact component={Logout} />
          <Route
            path="/auth"
            exact
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Auth />
              </Suspense>
            )}
          />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
};

const mapDisptachToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDisptachToProps
  )(App)
);
