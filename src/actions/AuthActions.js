import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  RECOVERY_PASSWORD,
  RECOVERY_PASSWORD_FAIL,
  RECOVERY_PASSWORD_SUCCESS
} from './types';
import AuthService from '../services/Auth.service';
import ForgotPasswordService from '../services/ForgotPassword.service';

const authServices = new AuthService();
const forgotPasswordServices = new ForgotPasswordService();

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

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
      const user = { email, password };
      authServices.login(user)
        .then(
          (response) => {
            saveItem('authToken', response.data.token)
            .then(resp => {
              saveItem('refreshToken', response.data.token);
            });
            saveItem('userObject', JSON.stringify(response.data.user));
            loginUserSuccess(dispatch);
          })
        .catch((error) => loginUserFail(dispatch));
  };
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch) => {
  dispatch({
    type: LOGIN_USER_SUCCESS
  });
  Actions.Home();
};

export const recoveryUser = ({ email }) => {
  return (dispatch) => {
    dispatch({ type: RECOVERY_PASSWORD });
      forgotPasswordServices.sendMail(email)
        .then((response) => recoveryUserSuccess(dispatch))
        .catch((error) => recoveryUserFail(dispatch));
  };
};

const recoveryUserSuccess = (dispatch) => {
  dispatch({ type: RECOVERY_PASSWORD_SUCCESS });
};
const recoveryUserFail = (dispatch) => {
  dispatch({ type: RECOVERY_PASSWORD_FAIL });
};

const saveItem = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    throw error;
  }
};
