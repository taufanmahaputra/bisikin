import Repo from '../../../resources/postgre'
import * as Message from '../../../modules/message'

const handleSendMessageToSingleUser = async (req, res) => {
  const {rows} = await Repo.getUserDetailByUsername(req.body.username)
  const user = rows[0]

  if (user === undefined) {
   return res.status(400).json({message: "Username does not exist"})
  }

  const msg = Message.composeMessage(req.company.company_name, req.body.text)

  const requests = []

  if (user.active_line) {
    requests.push(Message.sendMessageLine(user.line_id, msg))
  }

  if (user.active_telegram) {
    requests.push(Message.sendMessageTelegram(user.telegram_id, msg))
  }

  Promise.all(requests).then(() => {
    res.status(200).json({message: 'OK'})
  }).catch(e => {
    console.log(e)
    res.status(500).json({message: 'Failed'})
  })
}

export {
  handleSendMessageToSingleUser
}