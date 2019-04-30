import twilio from 'twilio'
import Config from '../config'
import Postgre from '../resources/postgre'
import { createHash } from '../utils/hash'

const client = twilio(Config.whatsapp.accountSid, Config.whatsapp.authToken)
const SENDER = Config.whatsapp.number

const sendReplyMessage = (token, msg) => client.messages.create({
  from: SENDER,
  to: token,
  body: msg
})

const sendReplyWrongCommandMessage = (token) => client.messages.create({
  from: SENDER,
  to: token,
  body: 'Wrong input. Type /keywords for more.'
})

const insertNewUser = async (fullName, username, password) => {
  let response = 'Failed. Your password must contain only 6 digit numbers.'

  if (!/^\d{6}$/.test(password)) {
    return response
  }

  const passwordHash = createHash(password)
  response = `Success!\nThis is your account for LOGIN. DO NOT GIVE IT TO ANYONE.
  Username: ${username}
  Password: ${password}`

  try {
    await Postgre.insertNewUser(username, fullName, passwordHash)
  } catch (e) {
    console.log(e)
    response = 'Failed. Your username already exist.'
  }

  return response
}

module.exports = {
  client,
  sendReplyMessage,
  sendReplyWrongCommandMessage,
  insertNewUser
}