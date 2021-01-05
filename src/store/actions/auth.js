import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    err,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

// Thunk action: action that return function(thunk)
export const auth = (login, password, isSignUp) => {
  const token = 'AIzaSyBJ-LSC3RKl51kDjKIwOn8sttBgDG2XMmI';
  return (dispatch) => {
    dispatch(authStart());
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${token}`;
    if (isSignUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${token}`;
    }
    Axios.post(url, { email: login, password, returnSecureToken: true })
      .then((res) => {
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error.message));
      });
  };
};
