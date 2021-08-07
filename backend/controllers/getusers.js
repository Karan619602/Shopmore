import User from '../models/user.js'
import Errorhandling from '../error/errorhandling.js'
import catchasyncerror from '../middlewares/catchasyncerror.js'
import sendToken from '../utils/jwtToken.js'
import  {sendEmail} from '../utils/sendemail.js'
import crypto from 'crypto'
import  cloudinary  from 'cloudinary';

//Register user => api/v1/register

export const getusers= catchasyncerror( async(req,res,next)=>{

const result= await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:'avatar',
    width:150,
    crop:'scale'
})
       const {name, email,password}= req.body;
       const user= await User.create({
           name,
           email,
           password,
           avatar:{
               public_id:result.public_id,
               url:result.secure_url
           }
       })
       sendToken(user,200,res)

     })


export const login= catchasyncerror(async (req,res,next)=>{
    const {email,password}= req.body;

    // check if email or password stored by users
    if(!email||!password){
     return   next(new Errorhandling('enter email and password', 400))
    }

    //finding user in database
    const user= await User.findOne({email}).select('+password')
    if(!user)
    {
        return next(new Errorhandling('enter correct email or password',400))
    }
    //if password if incorrect
    const isPasswordMatched= await user.comparepassword(password)
    if(!isPasswordMatched){
        return next(new Errorhandling('enter correct password',401))

    }
    sendToken(user,200,res)
})

//logout user => /api/v1/logout

export const logout= catchasyncerror(async (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.send({
        success:true,
        message:'logout'
    })
})



