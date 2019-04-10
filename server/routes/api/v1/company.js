import {Router} from 'express'
import * as companyController from '../../../controller/api/v1/companies_controller'

const router = Router();

/* GET list company's subscriber detail. */
router.get('/subscriber', companyController.handleGetSubscriber);

module.exports = router;
