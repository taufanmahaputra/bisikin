import {Router} from 'express'
import * as messageController from '../../../controller/api/v1/messages_controller'

const router = Router();

/* POST a message to single user. */
router.post('/', messageController.handleSendMessageToSingleUser);

module.exports = router;
