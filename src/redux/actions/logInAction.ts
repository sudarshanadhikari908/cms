import { loginActionTypes } from '../types/LoginType';

export const setUser = (payload: any) => ({
  type: loginActionTypes.SET_LOGIN_SUCCESS,
  payload: payload,
});

export const setLoginError = (payload: any) => ({
  type: loginActionTypes.SET_LOGIN_FAILED,
  payload: payload,
});
