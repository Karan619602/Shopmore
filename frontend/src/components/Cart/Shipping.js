import React, { useState } from 'react'
import Metadata from '../layout/Metaata'
// import { useAlert } from 'react-alert'
import { useDispatch , useSelector } from 'react-redux'
import { saveshippinginfo } from '../actions/cartactions'
import { Fragment } from 'react'



const Shipping = ({history}) => {
    const { cartItems ,shippinginfo} = useSelector(state => state.cart)

    const dispatch=useDispatch();
    const [address,setaddress]=useState(shippinginfo.address)
    const [city,setcity]=useState(shippinginfo.city)
    const [postalCode,setpostalCode]=useState(shippinginfo.postalCode)
    const [phoneNo,setphoneNo]=useState(shippinginfo.phoneNo)

    const submithandler=(e)=>{
        e.preventDefault();
        dispatch(saveshippinginfo({address,city,postalCode,phoneNo}))
        history.push('/payment')
    }


    return(
        <Fragment>
            <Metadata title={'Shipping info'}/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submithandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e)=>setaddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                required
                                value={city}
                                onChange={(e)=>setcity(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e)=>setphoneNo(e.target.value)}                       
                                 required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e)=>setpostalCode(e.target.value)}
                                required
                            />
                        </div>

                        

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
Proceed to pay ₹{cartItems.reduce((prevvalue,item)=>prevvalue+item.quantity*item.price,0).toFixed(2)}
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}


export default Shipping;