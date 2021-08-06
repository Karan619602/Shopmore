import  products  from '../models/product.js';

import Errorhandling from '../error/errorhandling.js'
import asyncerror from '../middlewares/catchasyncerror.js'
import Apifeatures from '../utils/Apifeatures.js';


export const newproducts =asyncerror( async (req,res,next)=>{
    req.body.user=req.user.id
    const product= await products.create(req.body);
    res.send({
        success:true,
        product
    })
    
})

//get all products
export const getproducts=asyncerror( async (req,res,next)=>{
  const  resPerPage =6;
  const productsCount = await products.countDocuments()
     const apifeatues= new Apifeatures(products.find(),req.query)
            .search()
            .filter()
            .pagination(resPerPage)

    

    const Products= await apifeatues.query;

    res.status(200).json({
        success:true,
        
        productsCount,
        resPerPage,
        Products
    })
 })
 
 //get single product detaile  => /api/v1/product/:id

 export const getsingleproduct=asyncerror( async (req,res,next)=>{
     const product= await products.findById(req.params.id)

     if(!product)
     return next(new Errorhandling('product not found',404))
else{
    res.status(200).json({
     product
    })
}
 })

    //update single product
    export const updateproduct=asyncerror(async (req,res,next)=>{
        const product = await products.findById(req.params.id)
        if(!updateproduct)
        return res.status(404).json({
            success:false,
            message:'product not found'
        })
    product = await products.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true,
        product
    })
    
    })

    // delete product

    export const deleteproduct = asyncerror(async (req,res,next)=>{
        const product = await products.findById(req.params.id)
        if(!deleteproduct)
        return res.status(404).json({
            success:false,
            message:'product not found'
        })
        await product.remove();
     
        res.status(200).json({
            success:true,
            message:"product deleted",
            product
        })
        

    })

