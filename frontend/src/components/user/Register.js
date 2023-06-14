import React,{Fragment,useEffect,useState} from 'react'
import {register,clearerrors} from '../actions/useractions'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Metadata from '../layout/Metaata'



export const Register=({history})=>{

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,SetName]=useState('')
  
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

       
      
        dispatch(register(name,email,password))
    }

   
    return(
        <Fragment>
            <Metadata title={'Register user'}/>
            <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg"  onSubmit={submithandler}>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" id="name_field" className="form-control" 
             name='name'
              value={name}
              onChange={(e)=>SetName(e.target.value)}/>
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name='email'
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
                name='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
            </div>


                   
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading?true:false}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
        </Fragment>
    )
}