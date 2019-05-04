import {
  SET_IS_LOGIN,
  JWT_EXPIRED
} from './constant'

export function setIsLogin (value) {
  return { type: SET_IS_LOGIN, payload: { value } }
}

export function jwtExpired () {
  return { type: JWT_EXPIRED, payload: {} }
}