import Orders from '../models/orders.js'
 import products from '../models/product.js'
import catchasyncerror from '../middlewares/catchasyncerror.js'
import Errorhandling from '../error/errorhandling.js'

//create new orders =>api/v1/order
export const newOrder= catchasyncerror(async(req,res,next)=>{
    const{orderItems,shippingInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paymentInfo}= req.body


    const order =await Orders.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        paymentInfo,
        paidAt:Date.now(),
        user: req.user._id
    })
    res.status(200).json({
        success:true,
        order
    })
})

//get single order=>api/v1/order/:id

export const getsingleorder=catchasyncerror(async(req,res,next)=>{
    const order =await Orders.findById(req.params.id).populate('user','name email')
    if(!order){
        return next(new Errorhandling(`order not found with this id:${req.params.id}`))
    }
    res.status(201).json({
        success:true,
        order
    })
})
//get logged user orders
export const userorders=catchasyncerror(async(req,res,next)=>{
    const orders =await Orders.find({user:req.user.id})
    
    res.status(201).json({
        success:true,
        orders
    })
})

