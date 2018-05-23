import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import InvisibleDiv from '../../../hoc/InvisibleDiv/InvisibleDiv';

const sideDrawer = (props) => {
  const attachedClasses = [ classes.SideDrawer ];
  
  attachedClasses.push(
    props.isSideDrawerShowing ? classes.Open : classes.Close
  );

  return (
    <InvisibleDiv>
      <Backdrop show={props.isSideDrawerShowing} clicked={props.close} />
      <div className={attachedClasses.join(' ')} onClick={props.close}>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </InvisibleDiv>
  );
};

export default sideDrawer;