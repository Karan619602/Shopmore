import express from 'express'
const router = express.Router();
import {isAuthenticatedUser} from '../middlewares/authuser.js'

import { processpayments,secretapi} from '../controllers/getpayments.js';

router.post('/payment/process',isAuthenticatedUser,processpayments)
router.get('/secretapi',secretapi)





export default router;
