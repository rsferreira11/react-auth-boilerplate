import React, { Component } from 'react';
import { connect } from 'react-redux';


import InvisibleDiv from '../../hoc/InvisibleDiv/InvisibleDiv';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

/**
 * Component used to keep on track of the layout shared between pages
 */
class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState, props) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  }

  render() {
    return (
      <InvisibleDiv>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          isSideDrawerShowing={this.state.showSideDrawer}
          close={this.sideDrawerCloseHandler}
        />
        <Toolbar
          isAuth={this.props.isAuthenticated}
          openSideDrawer={this.sideDrawerToggleHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </InvisibleDiv>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Layout);