import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Index</NavigationItem>
    {
      props.isAuth
        ? (<NavigationItem link="/logout">Logout</NavigationItem>)
        : (<NavigationItem link="/auth">Authenticate</NavigationItem>)
    }
  </ul>
);

export default navigationItems;