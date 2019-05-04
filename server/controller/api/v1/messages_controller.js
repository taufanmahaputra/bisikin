import Repo from '../../../resources/postgre'
import * as Message from '../../../modules/message'

const handleSendMessageToSingleUser = async (req, res) => {
  const {rows} = await Repo.getUserDetailByUsername(req.body.username)
  const user = rows[0]

  if (user === undefined) {
   return res.status(400).json({message: "Username does not exist"})
  }

  const msg = Message.composeMessage(req.company.company_name, req.body.text)

  let requests = []

  if (user.active_line) {
    requests.push(Message.sendMessageLine(user.line_id, msg))
  }

  if (user.active_telegram) {
    requests.push(Message.sendMessageTelegram(user.telegram_id, msg))
  }

  if (user.active_whatsapp) {
    requests.push(Message.sendMessageWhatsapp(user.mobile_phone, msg))
  }

  Promise.all(requests).then(() => {
    res.status(200).json({message: 'OK'})
  }).catch(e => {
    console.log(e)
    res.status(500).json({message: 'Failed'})
  })
}

const handleSendMulticastMessage = async (req, res) => {
  const msg = Message.composeMessage(req.company.company_name, req.body.text)
  const {rows} = await Repo.getListUserDetailByUsernames(req.body.usernames)

  let lineIds = [], telegramIds = []

  rows.map(user => {
    if (user.active_line) {
      lineIds.push(user.line_id)
    }

    if (user.active_telegram) {
      telegramIds.push(user.telegram_id)
    }
  })

  Promise.all([
    Message.sendMulticastMessageLine(lineIds, msg),
    Message.sendMulticastMessageTelegram(telegramIds, msg)])
    .then(() => {
    res.status(200).json({message: 'OK'})
  }).catch(e => {
    console.log(e)
    res.status(500).json({message: 'Failed'})
  })
}

export {
  handleSendMessageToSingleUser,
  handleSendMulticastMessage
}