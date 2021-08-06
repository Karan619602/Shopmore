import catchasyncerror from '../middlewares/catchasyncerror.js';
import stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '../error/secret.js';
const Stripe= stripe(STRIPE_SECRET_KEY)

export const processpayments=catchasyncerror(async(req,res,next)=>{
    const paymentIntent = await Stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'INR',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})
    export const secretapi=catchasyncerror(async(req,res,next)=>{
       
    
        res.status(200).json({
            success: true,
            secretapi: process.env.STRIPE_API_KEY
        })
    

})


