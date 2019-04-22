import TelegramBot from 'node-telegram-bot-api';
import Config from '../config'
import {createHash, createHashPassword, isValidHashPassword} from '../utils/hash'
import Postgre from '../resources/postgre'

const TOKEN = Config.telegram.token;

const bot = new TelegramBot(TOKEN);

bot.setWebHook(`https://bisikin-telegram.serveo.net/bot${TOKEN}`);

const sendReplyMessage = (token, msg) => bot.sendMessage(token, msg, {parse_mode: 'markdown'})

const sendReplyWrongCommandMessage = (token) => bot.sendMessage(token, 'Wrong input. Type /keywords for more.')

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

const subscribeCompany = async (username, password, companyToken, telegramId) => {
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

  response = `You have successfully subscribed to *${company.company_name}* through the Telegram platform.`

  try {
    await Postgre.updateTelegramIdIfNull(username, telegramId)
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
  response += ` *${company.company_name}* on Telegram platform.`

  try {
    await Postgre.updateStatusActiveTelegram(company.id, user.id, status)
  } catch (e) {
    console.log(e)
  }

  return response
}

export {
  bot,
  sendReplyMessage,
  sendReplyWrongCommandMessage,
  insertNewUser,
  subscribeCompany,
  activatePlatformSpecificCompany
}