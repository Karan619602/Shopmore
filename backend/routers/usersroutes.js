import express from 'express';
const router = express.Router();

import {isAuthenticatedUser} from '../middlewares/authuser.js'

import {getusers,
       login, 
       logout,
       getUserprofile  } from '../controllers/getusers.js'

router.post('/register', getusers)
router.post('/login', login)
router.get('/logout',logout)

router.get('/me',isAuthenticatedUser,getUserprofile)



export default router