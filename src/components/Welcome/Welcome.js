import React from 'react';

import classes from './Welcome.css';

const welcome = (props) => (
  <div className={classes.Welcome}>
    <h1>WELCOME!</h1>
    <p>More info about this boilerplate can be found in the github page</p>
    <p>Thanks for using it</p>
    <h4>Login Status: {props.isAuthenticated ? "LOGGED IN" : "LOGGED OUT"}</h4>
  </div>
);

export default welcome;