import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  RECOVERY_PASSWORD,
  RECOVERY_PASSWORD_SUCCESS,
  RECOVERY_PASSWORD_FAIL
} from '../actions/types';

const INTITIAL_STATE = {
   email: '',
   password: '',
   user: null,
   error: '',
   loading: false,
   error2: ''
 };

export default (state = INTITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INTITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Password incorrecta.', password: '', loading: false };
    case RECOVERY_PASSWORD:
      return { ...state, loading: true, error2: '' };
    case RECOVERY_PASSWORD_SUCCESS:
      return { ...state, error2: 'Se te ha enviado un mail.' };
    case RECOVERY_PASSWORD_FAIL:
      return { ...state, error2: 'Email inválido.', email: '', loading: false };
    default:
      return state;

  }
};
