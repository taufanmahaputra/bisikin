import axios from 'axios'
import Config from '../config'

const composeMessage = (companyName, text) => {
  return `*[${companyName}]*\n${text}`
}

const sendMessageLine = (to, text) => {
  return axios.post(Config.service.line, {to: to, text: text})
}

const sendMessageTelegram = (to, text) => {
  return axios.post(Config.service.telegram, {to: to, text: text})
}

export {
  composeMessage,
  sendMessageLine,
  sendMessageTelegram
}