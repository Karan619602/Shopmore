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

//forgot password 
// export const forgotpassword=catchasyncerror(async (req,res,next)=>{
//     const user= await User.findOne({email:req.body.email});
//     if(!user){
//         return next(new Errorhandling('user not found with this email',500))
//     } 

//     //get reset token
//     const resetToken =user.getResetPasswordToken();
//     await user.save({validateBeforeSave:false})

//     const resetUrl= `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
//     const message=`Your password reset token is as follow:\n\n${resetUrl}\n\nif not requested this email ,then ignore it`

//     try {
//         await sendEmail({
//             email:user.email,
//             subject:'shopit password recovery',
//             message
//         })

//         res.status(200).json({
//             success:true,
//             message:`email sent to :${user.email}`
//         })
//     } catch (error) {
//         user.resetPasswordToken=undefined;
//         user.resetPasswordExpire=undefined;

//         await user.save({validateBeforeSave:false})

//         return next(Errorhandling(error.message,500))
//     }

// })

//reset password=>api/v1/password/reset/:token
// export const resetpassword=catchasyncerror(async (req,res,next)=>{
//     //hash url token
//     const resetPasswordToken=  crypto.createHash('sha256').update(req.params.token).digest('hex');
//     const user= await User.findOne({
//         resetPasswordToken,
//         resetPasswordExpire:{$gt:Date.now()}

//     })
//     if(!user){
//         return next(new Errorhandling("password reset token is invalid",400))
//     }
//     if(req.body.password!==req.body.confirmpassword){
//         return next(new Errorhandling("password does not  match",400))

//     }
//     //save new password
//     user.password=req.body.password
//     user.resetPasswordToken=undefined;
//     user.resetPasswordExpire=undefined;

//     await user.save();
//     sendToken(user,200,res)

// })


//get currently logged user details =>/api/v1/me

export const getUserprofile=catchasyncerror(async (req,res,next)=>{
const user= await User.findById(req.user.id);

res.status(200).json({
    success:true,
    user
})
})




//update profile


