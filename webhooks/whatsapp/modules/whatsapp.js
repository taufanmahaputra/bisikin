import twilio from 'twilio'
import Config from '../config'
import Postgre from '../resources/postgre'
import { createHash, isValidHashPassword } from '../utils/hash'

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

const subscribeCompany = async (username, password, companyToken, mobilePhone) => {
  let resultQuery
  let response

  resultQuery = await Postgre.getCompanyIdAndNameByCompanyToken(companyToken)
  const company = resultQuery.rows[0]

  resultQuery = await Postgre.getUserDetailByUsername(username)
  const user = resultQuery.rows[0]

  if (company === undefined || user === undefined) {
    return `Data does not exist. Please check either your username or company's token.`
  }

  const hash = createHash(password)
  if (!isValidHashPassword(user.password, hash)) {
    return 'Password invalid.'
  }

  response = `You have successfully subscribed to *${company.company_name}* through the Whatsapp platform.`

  try {
    await Postgre.updateMobilePhoneIfNull(username, mobilePhone)
    await Postgre.insertNewSubscriber(company.id, user.id)
  } catch (e) {
    console.log(e)
    response = `You already subscribed to *${company.company_name}*`
  }

  return response
}

const activatePlatformSpecificCompany = async (username, password, companyToken, status) => {
  let resultQuery
  let response

  resultQuery = await Postgre.getCompanyIdAndNameByCompanyToken(companyToken)
  const company = resultQuery.rows[0]

  resultQuery = await Postgre.getUserDetailByUsername(username)
  const user = resultQuery.rows[0]

  if (company === undefined || user === undefined) {
    return `Data does not exist. Please check either your username or company's token.`
  }

  const hash = createHash(password)
  if (!isValidHashPassword(user.password, hash)) {
    return 'Password invalid.'
  }

  response = (status === true) ? 'Activated' : 'Deactivated'
  response += ` *${company.company_name}* on Whatsapp platform.`

  try {
    await Postgre.updateStatusActiveWhatsapp(company.id, user.id, status)
  } catch (e) {
    console.log(e)
  }

  return response
}

module.exports = {
  client,
  sendReplyMessage,
  sendReplyWrongCommandMessage,
  insertNewUser,
  subscribeCompany,
  activatePlatformSpecificCompany
}