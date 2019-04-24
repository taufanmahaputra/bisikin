import {
  SET_ERROR_LOGIN
} from './constant'

export function setErrorLogin(value) {
  return { type: SET_ERROR_LOGIN, payload: { value } }
}
