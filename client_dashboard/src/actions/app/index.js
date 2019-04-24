import {
  SET_IS_LOGIN
} from './constant'

export function setIsLogin (value) {
  return { type: SET_IS_LOGIN, payload: { value } }
}