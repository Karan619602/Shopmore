import mongoose from 'mongoose'
import User from './user.js'

const schema=new mongoose.Schema({
  name:{
      type:String,
      required: [true,"enter the product name"]
  },
  price:{
      type:Number,
      required:[true,"enter the price"],
      maxLength:[5,'do not exceed 5 charactes'],
      default:0.0
  },
  description:{
    type:String,
    required: [true,"enter the decription "]
},
ratings:{
    type:Number,
    default:0
},
images:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
],
numOfReviews: {
    type: Number,
    default: 0
},

category:{
    type:String,
    required: [true,"enter the category"],
    enum: {
        values: [
            'Electronics',
            'Cameras',
            'Laptops',
            'Accessories',
            'Headphones',
            'Food',
            "Books",
            'Clothes/Shoes',
            'Beauty/Health',
            'Sports',
            'Outdoor',
            'Home'
        ],
        message:"please enter the correct chioce"
    }
},
reviews:[
    {  user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
        name:{
            type:String,
            required: [true,"enter the product name"]
        },
        rating:{
            type:Number,
            default:0
        },
        comment:{
            type:String,
            required: [true,"enter the product name"]
        }
    }

    ],
    seller:{
        type:String,
        required: [true,"enter the seller name"]
    },

    stock:{
        type:Number,
        required:[true,'enter the stock'],
        MaxLength:[5,' do not exceed 5 characters']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
               },
    createdAt:{
        type:Date,
        Default:Date.now
    }
    
    

})
const products =mongoose.model('products',schema)

 export default products

