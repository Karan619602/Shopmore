import {ALL_PRODUCTS_REQUESTS,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    ALL_PRODUCTS_DETAILS_REQUESTS,
    ALL_PRODUCTS_DETAILS_SUCCESS,
    ALL_PRODUCTS_DETAILS_FAIL}from '../constant/productconstants'



export const productsReducer=(state={products:[]},action)=>{
   switch(action.type){

    case ALL_PRODUCTS_REQUESTS:{
         return{
                 loading:true,products:[]
              }
    }
    case ALL_PRODUCTS_SUCCESS:{
        return{
                loading:false,
                Products:action.payload.Products,
                productsCount:action.payload.productsCount,
                resPerPage:action.payload.resPerPage
             }
   }
   case ALL_PRODUCTS_FAIL:{
       return{
       loading:false,
       error:action.payload
       }
   }
   case CLEAR_ERRORS:{
       return{
           ...state,
           error:null
       }
   }
       default:
           return state;
   }
}

export const productDetailReducer=(state={product:{}},action)=>{
switch(action.type){
    case ALL_PRODUCTS_DETAILS_REQUESTS:
        return {
            ...state,loading:true
        }
        case ALL_PRODUCTS_DETAILS_SUCCESS:
            return{
             loading:false,
             product:action.payload
            }

            case ALL_PRODUCTS_DETAILS_FAIL:
                return{
                    ...state,
                    error:null
                }
                case CLEAR_ERRORS:
                    return{
                        ...state,
                        error:null
                    }
        
      default:
        return state
}
}