import React from 'react';

import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle click={props.openSideDrawer}/>
    <div className={classes.Logo}>
      {/* add logo here */}
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar;