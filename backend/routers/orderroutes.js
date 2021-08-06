import express from 'express'
const router = express.Router();
import {isAuthenticatedUser} from '../middlewares/authuser.js'

import { newOrder ,userorders} from '../controllers/getorders.js';

router.post('/order/new',isAuthenticatedUser,newOrder)

router.get('/orders/me',isAuthenticatedUser,userorders)





export default router;
