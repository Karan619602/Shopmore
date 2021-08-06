import axios from 'axios'
import {ALL_PRODUCTS_REQUESTS,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  ALL_PRODUCTS_DETAILS_REQUESTS,
    ALL_PRODUCTS_DETAILS_SUCCESS,
    ALL_PRODUCTS_DETAILS_FAIL }from '../constant/productconstants'
export const getproducts=(keyword='',currentPage=1)=>async (dispatch)=>{
  try {
      
   dispatch({type:ALL_PRODUCTS_REQUESTS})
   
   
     const {data}= await axios.get(`http://localhost:8000/api/v1/products?keyword=${keyword}&page=${currentPage}`)
     dispatch({type:ALL_PRODUCTS_SUCCESS,
             payload:data
    })

  }
  catch (error) {
      dispatch({
        type:ALL_PRODUCTS_FAIL,
        payload:error.response.data.message

      })
  }
}

export const getproductsDetails=(id)=>async (dispatch)=>{
  try {
      
   dispatch({type:ALL_PRODUCTS_DETAILS_REQUESTS})
   
   
     const {data}= await axios.get(`http://localhost:8000/api/v1/product/${id}`)
     dispatch({type:ALL_PRODUCTS_DETAILS_SUCCESS,
             payload:data.product
    })

  }
  catch (error) {
      dispatch({
        type:ALL_PRODUCTS_DETAILS_FAIL,
        payload:error.response.data.message

      })
  }
}
export const clearerrors=async (dispatch)=>{
     dispatch({type:CLEAR_ERRORS})
}









