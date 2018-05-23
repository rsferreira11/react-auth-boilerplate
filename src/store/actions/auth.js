import * as actionTypes from './actionTypes';

import RequestService from '../../services/requestService';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url = isSignUp ? 'signUp' : 'signIn';

    RequestService.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.expiresIn * 1000)
        localStorage.setItem('token', response.idToken);
        localStorage.setItem('userId', response.localId);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(response.idToken, response.localId));
        dispatch(checkAuthTimeout(response.expiresIn));
      })
      .catch(response => {
        dispatch(authFail(response.error));
      });
  }
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    const userId = localStorage.getItem('userId');

    if (token && userId && expirationDate > new Date()) {
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
    }
    else {
      dispatch(logout());
    }
  }
};
