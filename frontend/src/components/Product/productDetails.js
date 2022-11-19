import React, { useEffect,Fragment, useState } from 'react'
import {Carousel, CarouselItem} from 'react-bootstrap'
import { getproductsDetails, clearerrors } from '../actions/productsactions'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { addItemtocart } from '../actions/cartactions'

import {Loader} from '../layout/loader'
import Metadata from '../layout/Metaata'
export const ProductDetails=({match,history})=>{

    const [quantity,setquantity]=useState(1);
   const dispatch= useDispatch();

   const {loading,error,product} =useSelector(state=>state.productDetails)
   const {isAuthenicated} =useSelector(state=>state.auth)


   const alert =useAlert();
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerrors())
        }
           dispatch(getproductsDetails(match.params.id))
    },[dispatch,alert,error,match.params.id])


     const addtocart=()=>{
         if(isAuthenicated){
            dispatch(addItemtocart(match.params.id,quantity))
            alert.success('item added to cart')
         }
         else{
             history.push('/login')
             alert.error('Please login before add product to cart')

         }

}

    const decreasestock=()=>{
        const count= document.querySelector('.count');
        if(count.valueAsNumber<=1)
        return;
        const stock= count.valueAsNumber-1;
        setquantity(stock);
    }
    const increasestock=()=>{
        const count= document.querySelector('.count');
        if(count.valueAsNumber>=product.stock)
        return;
        const stock= count.valueAsNumber+1;
        setquantity(stock);


    }
    return(
        <Fragment>
            <Metadata title={product.name}/>
        {loading ? <Loader/>:(
        <Fragment>
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid " id="product_image">
              <Carousel pause="hover"  className="imagesize">
                  {product.images && product.images.map(image=>(
                      <CarouselItem key={image.public_id}>
                          <img className="d-block w-100 " src={image.url}  alt={product.title}/>
                      </CarouselItem>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

               

                <p id="product_price">₹{product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreasestock}>-</span>

                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                    <span className="btn btn-primary plus" onClick={increasestock}>+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock===0} onClick={addtocart}>Add to Cart</button>

                <hr/>

                <p>Status: <span id="stock_status" className={product.stock>0?'greenColor':'redColor'}>{product.stock>0?'In Stock':'out of stock'}</span></p>

                <hr/>

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr/>
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
				
				
               
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>

                                        <textarea name="review" id="review" className="form-control mt-3">

                                        </textarea>

                                        <button className={"btn my-3 float-right review-btn px-4 text-white"} data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
						
            </div>

        </div>
        </div>
        </Fragment>)}
        </Fragment>
        


    )
}