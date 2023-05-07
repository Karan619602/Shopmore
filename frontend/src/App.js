import {BrowserRouter as Router,Route} from 'react-router-dom'
import {useEffect, useState } from 'react'
import {Login} from './components/user/login';
import { Register } from './components/user/Register';
import Profile from './components/user/Profile';
import  ProtectedRoute  from './components/route/protectedroute';
import Header from './components/header';
import './App.css';
import Footer from './components/layout/footer';
import Home from './components/Home';
import { ProductDetails } from './components/Product/productDetails';
import ForgotPassword from './components/user/ForgotPassword';
import {  loaduser } from './components/actions/useractions';
import Resetpassword from './components/user/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import Payment from './components/Cart/Payment';
import Orders from './components/order/Myorder';
import store from './store'
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { useSelector } from 'react-redux'


function App() {
 console.log("start");
  const { user, loading } = useSelector(state => state.auth)
  console.log("user:",user);
  const [stripeApiKey, setStripeApiKey] = useState('');
  async function getStripApiKey() {
      
    let {data}= await axios.get('api/v1/secretapi')
       setStripeApiKey(data.secretapi)
     }
     useEffect(() =>{
   

    
      getStripApiKey();
   },[user])
     useEffect(() =>{
  
      store.dispatch(loaduser())
   },[])
 
  return (
  <Router>
     <div className="App">
    <Header/>
    <div className="container conatiner-fluid"></div>
    <Route path="/" component={Home} exact/>
    <Route path="/search/:keyword" component={Home} exact/>
    <Route path="/product/:id" component={ProductDetails} exact/>
    <Route path="/cart" component={Cart} exact/>
    <ProtectedRoute path="/shipping" component={Shipping}/>
   
  {stripeApiKey&& <Elements  stripe={loadStripe(stripeApiKey)}>
       <ProtectedRoute path="/payment" component={Payment}/>
       </Elements>}
       <ProtectedRoute path="/orders/me" component={Orders} exact/>



    <Route path="/login" component={Login} />
    <Route path="/registers" component={Register}/>
    <Route path="/password/forgot" component={ForgotPassword} exact/>
    <ProtectedRoute path="/password/reset/:token" component={Resetpassword} exact/>
    <ProtectedRoute  path="/me" component={Profile} exact/>
  <Footer/>
   
    
  </div>
  </Router>
  )
}

export default App;

