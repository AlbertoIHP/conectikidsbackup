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
} from '../actions/types';

const INTITIAL_STATE = {
   email: '',
   password: '',
   rut: '',
   city: '',
   address: '',
   user: null,
   error: '',
   loading: false,
 };

export default (state = INTITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case CITY_CHANGED:
      return { ...state, city: action.payload };
    case ADDRESS_CHANGED:
      return { ...state, address: action.payload };
    case RUT_CHANGED:
      return { ...state, rut: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INTITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Password incorrecta..', password: '', loading: false };
    case CREATE_USER:
      return { ...state, loading: true, error: '' };
    case CREATE_USER_SUCCESS:
      return { ...state, ...INTITIAL_STATE };
    case CREATE_USER_FAIL:
      return { ...state, error: 'Datos inválidos.', password: '', loading: false };
    default:
      return state;

  }
};
