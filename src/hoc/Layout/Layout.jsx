import React, { useState } from "react";
import Aux from "../Auxilary/Auxilary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

import styles from "./Layout.module.css";

import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import { connect } from "react-redux";

const Layout = props => {
  const [sideDrawerIsVisible, setSideIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar isAuth={props.isAuthenticated} click={sideDrawerToggleHandler} />

      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
};

export default connect(mapStateToProps)(Layout);
