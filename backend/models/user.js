import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'



const userSchema =new mongoose.Schema({
          name:{
              type: String,
              required :[true, 'please enter your name'],
              maxlength:[30,'Your name cannot exceed 30 characters']
          },
          email:{
            type: String,
            required :[true, 'please enter your email'],
            unique:true,
            validate:[validator.isEmail,'Please enter valid email address']
          },
          password:{
            type: String,
            required :[true, 'please enter your password'],
            minlength:[6,'Your password must be longer than 6 characters'],
            select: false
                  },
            role:{
                type:String,
                default:'user'
            },
            
            createdAt:{
                type:Date,
                Default:Date.now()
            },
            resetPasswordToken:String,
            resetPasswordExpire: Date
})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    this.password= await bcrypt.hash(this.password,10)
    return this;
})

userSchema.methods.comparepassword= async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password)
}



userSchema.methods.getJwttoken= function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_TIME
})
}


//generate reset password token
userSchema.methods.getResetPasswordToken=function(){

const resetToken= crypto.randomBytes(20).toString('hex');
//enryption
this.resetPasswordToken= crypto.createHash('sha256').update(resetToken).digest('hex');
this.resetPasswordExpire= Date.now() +30*60*1000

return resetToken

}
const user= mongoose.model('User', userSchema)

export default user