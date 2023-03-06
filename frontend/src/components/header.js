import React from 'react'
import { Fragment } from 'react'
import {Route,Link} from 'react-router-dom'
import Search from './layout/search'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logoutuser } from './actions/useractions'
import './../App.css'
const Header =()=>{

  const alert = useAlert();
  const dispatch=useDispatch()

  const {cartItems} =useSelector(state=>state.cart)

  const {user,loading}=useSelector(state=>state.auth)


  const logouthandler=()=>{
    dispatch(logoutuser());
    alert.success('logout successfully');
     cartItems.length=0;
  }
    return  <Fragment>
           <nav className="navbar row naviga">
      <div className="col-12 col-md-3 mt-md-0 ">
        <div className="navbar-brand"> 
        <Link to="/">
       <HomeIcon className="homebutton"/> 
       </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 ">
        <Route render={({history})=> <Search history={history}/>} />
      </div>
      
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart">
      <span id="cart" className="ml-3"><ShoppingCartIcon /></span>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>
        {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            
                                <span>{user && user.name}</span>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

{user && user.role === 'admin' && (
    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
)}
<Link className="dropdown-item" to="/orders/me">Orders</Link>
<Link className="dropdown-item" to="/me">Profile</Link>
<Link className="dropdown-item text-danger" to="/" onClick={logouthandler}>
    Logout
</Link>

</div>
                       </div> ) : !loading && (
                         <Fragment>
                           <Link to="/login"  id="login_btn">Login</Link>
                           <Link to="/registers"  id="signup_btn">signup</Link>


                         </Fragment>
                       )}
                       </div>
</nav>
       </Fragment>
        
}


export default Header

