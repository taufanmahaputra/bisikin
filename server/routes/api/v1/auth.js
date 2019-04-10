import {Router} from 'express'
import * as authController from '../../../controller/api/v1/authentication_controller'

const router = Router();

router.post('/login', authController.handleLogin);
router.post('/register', authController.handleRegister);

module.exports = router;
