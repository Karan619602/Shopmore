import {  combineReducers ,applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {productsReducer ,productDetailReducer}from './components/Reducers/productreducers'
import { authReducer ,userReducer,forgotpasswordReducer} from './components/Reducers/userreducers';
import { cartReducer } from './components/Reducers/cartReducers';
import { createOrderReducer ,myOrderReducer} from './components/Reducers/orderReducers';
const reducer = combineReducers({
products:productsReducer,
productDetails:productDetailReducer,
auth : authReducer,
user:userReducer,
forgotpassword:forgotpasswordReducer,
cart:cartReducer,
neworder:createOrderReducer,
myorders:myOrderReducer
})

let initialState={
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
            shippinginfo: localStorage.getItem('shippinginfo')
            ? JSON.parse(localStorage.getItem('shippinginfo'))
            : {}
    }
}

const middleware=[thunk]
const store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store;