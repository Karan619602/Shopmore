import User from '../models/user.js'
import Errorhandling from '../error/errorhandling.js'
import catchasyncerror from '../middlewares/catchasyncerror.js'
import sendToken from '../utils/jwtToken.js'

//Register user => api/v1/register

export const getusers= catchasyncerror( async(req,res,next)=>{


const {name, email,password}= req.body;
const user= await User.create({
    name,
    email,
    password
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

//get currently logged user details =>/api/v1/me

export const getUserprofile=catchasyncerror(async (req,res,next)=>{
    const user= await User.findById(req.user.id);
    
    res.status(200).json({
        success:true,
        user
    })
    })

