import {
  ON_CLICK_LOGIN_BUTTON_SUBMIT,
  ON_CLICK_SIGNUP_BUTTON_SUBMIT
} from './constant'

export function onClickLoginButtonSubmit(values) {
  return { type: ON_CLICK_LOGIN_BUTTON_SUBMIT, payload: { values } }
}

export function onClickSignupBUttonSubmit(values) {
  return { type: ON_CLICK_SIGNUP_BUTTON_SUBMIT, payload: { values } }
}