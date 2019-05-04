import * as api from '../constant'
import axios from 'axios'
import Cookie from 'js-cookie'

let cookiesData = Cookie.get('access_token')

export function getSubscribers () {
  return axios.get(api.COMPANY_SUBSCRIBERS_URL, generateRequestHeaders())
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