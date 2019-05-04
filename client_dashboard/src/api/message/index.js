import * as api from '../constant'
import axios from 'axios'
import Cookie from 'js-cookie'

let cookiesData = Cookie.get('access_token')

export function sendMessage (request) {
  return axios.post(api.MESSAGE_SEND_MESSAGE_URL, request, generateRequestHeaders())
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

function generateRequestHeaders () {
  cookiesData = !cookiesData ? Cookie.get('access_token') : cookiesData
  return {
    headers: {
      Authorization: `Bearer ${cookiesData}`
    }
  }
}