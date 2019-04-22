import * as line from '@line/bot-sdk'
import Config from '../config'
import Postgre from '../resources/postgre'
import {createHash, createHashPassword, isValidHashPassword} from '../utils/hash'

const config = {
  channelAccessToken: Config.line.channelAccessToken,
  channelSecret: Config.line.channelSecret
}
const client = new line.Client(config)

const sendReplyMessage = (token, msg) => client.replyMessage(
  token,
  {
    type: 'text',
    text: msg
  })

const sendCustomReplyMessage = (token, body) => client.replyMessage(token, body)

const sendReplyWrongCommandMessage = (token) => client.replyMessage(
  token,
  {
    type: 'text',
    text: 'Wrong input. Type /keywords for more.'
  })

const insertNewUser = async (fullName, username, mobilePhone) => {
  const {password, passwordHash} = createHashPassword()

  let response = `Success!\nThis is your secret password for LOGIN. DO NOT GIVE IT TO ANYONE.\nYour PASSWORD is ${password}`

  try {
    await Postgre.insertNewUser(username, fullName, mobilePhone, passwordHash)
  } catch (e) {
    console.log(e)
    response = 'Failed. Your username already exist.'
  }

  return response
}

const subscribeCompany = async (username, password, companyToken, lineId) => {
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

  response = `You have successfully subscribed to *${company.company_name}* through the LINE platform.`

  try {
    await Postgre.updateLineIdIfNull(username, lineId)
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
  response += ` *${company.company_name}* on LINE platform.`

  try {
    await Postgre.updateStatusActiveLine(company.id, user.id, status)
  } catch (e) {
    console.log(e)
  }

  return response
}

module.exports = {
  client,
  sendReplyMessage,
  sendCustomReplyMessage,
  sendReplyWrongCommandMessage,
  insertNewUser,
  subscribeCompany,
  activatePlatformSpecificCompany
}