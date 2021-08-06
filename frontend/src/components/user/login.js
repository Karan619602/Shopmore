import React,{Fragment,useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {login,clearerrors} from '../actions/useractions'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {Loader} from '../layout/loader'
import Metadata from '../layout/Metaata'



export const Login=({history})=>{

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const alert= useAlert();
    const dispatch= useDispatch();
    const {isAuthenicated,loading,error} =useSelector(state=>state.auth)

    useEffect(()=>{
        if(isAuthenicated){
            history.push('/');
        }
        if(error){
            
            dispatch(clearerrors())
        }



    },[dispatch,alert,isAuthenicated,error,history])

    
    const submithandler=(e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }

    return(
        <Fragment>
      {loading?<Loader/>:(
        <Fragment>
                    <Metadata title={'Login'}/> 
                      <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submithandler}>
            <h1 className="mb-3 login">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3 buttoncolor"
            >
              LOGIN
            </button>

            <Link to="/registers" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
    </Fragment> )}     
            
        </Fragment>
    )
}

