import {
  PAGE_REQUEST,
  ON_CLICK_SEND_MESSAGE_BUTTON,
  SET_SUBSCRIBERS
} from './constant'

export function pageRequest () {
  return { type: PAGE_REQUEST, payload: {} }
}

export function onClickSendMessage (to, text) {
  return { type: ON_CLICK_SEND_MESSAGE_BUTTON, payload: {username: to, text: text} }
}

export function setSubscribers (subscribers) {
  return { type: SET_SUBSCRIBERS, payload: { subscribers } }
}