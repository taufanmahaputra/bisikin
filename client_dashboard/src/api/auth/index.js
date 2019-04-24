import * as api from '../constant'
import axios from 'axios'

export function loginUser (request) {
  return axios.post(api.LOGIN_URL, request)
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}