import express from 'express'
const router = express.Router();
import {isAuthenticatedUser} from '../middlewares/authuser.js'

import { processpayments,secretapi} from '../controllers/getpayments.js';

router.post('/payment/process',isAuthenticatedUser,processpayments)
router.get('/secretapi',isAuthenticatedUser,secretapi)





export default router;
