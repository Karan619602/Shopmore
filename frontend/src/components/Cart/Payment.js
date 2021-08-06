import React,{Fragment, useEffect} from 'react'
import Metadata from '../layout/Metaata'
 import { useAlert } from 'react-alert'
import { useDispatch , useSelector } from 'react-redux'
import { createOrder,clearerrors } from '../actions/orderActions'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import axios from 'axios'
const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment=({history})=>{
    const alert=useAlert();
    const stripe=useStripe();
    const elements=useElements();
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.auth);
    const { cartItems ,shippinginfo} = useSelector(state => state.cart)
    const{error}=useSelector(state=>state.neworder)


    useEffect(()=>{
        if(error){
            alert.error(error);
            console.log(error);
            dispatch(clearerrors())
        }

    },[alert,dispatch,error])

    const order={
        orderItems:cartItems,
        shippingInfo:shippinginfo,
        itemsPrice:(cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0))
    }
    const paymentData={
      amount:Math.round(cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)*100)

    }


    const submithandler=async (e)=>{
      e.preventDefault();

      document.querySelector('#pay_btn').disabled = true;

      let res;
      try {

          const config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }

          res = await axios.post('/api/v1/payment/process', paymentData, config)

          const clientSecret = res.data.client_secret;

          console.log(clientSecret);

          if (!stripe || !elements) {
              return;
          }

          const result = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                  card: elements.getElement(CardNumberElement),
                  billing_details: {
                      name: user.name,
                      email: user.email
                  }
              }
          });

          if (result.error) {
              alert.error(result.error.message);
              document.querySelector('#pay_btn').disabled = false;
          } else {

              if (result.paymentIntent.status === 'succeeded') {

                  order.paymentInfo = {
                      id: result.paymentIntent.id,
                      status: result.paymentIntent.status
                  }

                  dispatch(createOrder(order))
                  alert.success('Order Placed Succesfully')
                 
              } else {
                  alert.error('There is some issue while payment processing')
              }
          }


      } catch (error) {
          document.querySelector('#pay_btn').disabled = false;
          alert.error(error.response.data.message)
      }
    }

    return(
        <Fragment>
            <Metadata title={'Payment '}/>
            <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submithandler}>
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    options={options}
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    options={options}

                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    options={options}

                    
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay ₹{cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)}
                </button>
    
              </form>
			  </div>
        </div>
        </Fragment>
    )

}

export default Payment;