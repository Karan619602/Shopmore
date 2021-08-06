import User from '../models/user.js'
import catchasyncerror from './catchasyncerror.js'
import Errorhandling from '../error/errorhandling.js'
import jwt from 'jsonwebtoken'


export const isAuthenticatedUser= catchasyncerror( async (req,res,next)=>{
    const {token}=req.cookies;
    //console.log(token);
    if(!token){
      return   next(new Errorhandling('user not verify',401))
    }

    const decoded= jwt.verify(token,process.env.JWT_SECRET)
    req.user= await User.findById(decoded.id)
    next()
})
 //authorize roles
export const authorizeroles=(...roles)=>{

return (req,res,next)=>{
   
  if(!roles.includes(req.user.role)){
    return (next( new Errorhandling(`role (${req.user.role}) is not allowed to access`,403)))
  }
  //console.log(req.user.role);
next()
}
}