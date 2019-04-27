import {
  SET_ERROR_ALERT
} from './constant'

export function setErrorAlert(value) {
  return { type: SET_ERROR_ALERT, payload: { value } }
}