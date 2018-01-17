import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CITY_CHANGED,
  ADDRESS_CHANGED,
  RUT_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER_FAIL,
  CREATE_USER,
  CREATE_USER_SUCCESS
} from './types';

const configpost = {
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
};
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const rutChanged = (text) => {
  return {
    type: RUT_CHANGED,
    payload: text
  };
};

export const addressChanged = (text) => {
  return {
    type: ADDRESS_CHANGED,
    payload: text
  };
};

export const cityChanged = (text) => {
  return {
    type: CITY_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    const url = 'https://almacenear.herokuapp.com/api/auth';
    var data = JSON.stringify(
      { "user": {"email": email.toLowerCase() , "password": password }}
    );
    axios.post(url, data , configpost)
      .then( response => loginUserSuccess(dispatch, response.data.jwt))
      .catch( error => loginUser(dispatch));
  };
};
const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.Map();
};

export const createUser = ({ email, password, rut, address, city }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    const url = 'https://almacenear.herokuapp.com/api/users';
    var data = JSON.stringify(
      { "user": {
          "email": email.toLowerCase(),
          "password": password,
          "rut": rut,
          "address": address,
          "city": city
        }
      }
    );
    axios.post(url, data , configpost)
    .then( response => createUserSuccess(dispatch))
    .catch( error => createUserFail(dispatch));
  };
};

const createUserSuccess = (dispatch) => {
  dispatch({
    type: CREATE_USER_SUCCESS
  });
  Actions.pop();
};

const createUserFail = (dispatch) => {
  dispatch({
    type: CREATE_USER_SUCCESS
  });
};
