import React,{Fragment,useEffect,useState} from 'react'
import {register,clearerrors} from '../actions/useractions'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Metadata from '../layout/Metaata'



export const Register=({history})=>{

  const [user,setuser]=useState({
      name:'',
      email:'',
      password:''
  })
  const { name, email, password } = user;

  const [avatar,setavatar]= useState('')
  const[avatarPreview,setavatarPreview]=useState('/images/default_avatar.jpg')
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

        const formdata= new FormData();
        formdata.set('name',name)
        formdata.set('email',email)
        formdata.set('password',password)
        formdata.set('avatar',avatar)


        
        dispatch(register(formdata))
    }

    const onChange=(e)=>{
   if(e.target.name==='avatar'){
   const reader= new FileReader();

   reader.onload=()=>{
       if(reader.readyState===2)
       {
           setavatarPreview(reader.result)
           setavatar(reader.result)
       }
   }

   reader.readAsDataURL(e.target.files[0])
   
} else{
    setuser({...user,[e.target.name]:e.target.value})
}

    }
    return(
        <Fragment>
            <Metadata title={'Register user'}/>
            <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg"  onSubmit={submithandler} encType='multipart/form-data'>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" id="name_field" className="form-control" 
             name='name'
              value={name}
               onChange={onChange}/>
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name='email'
              value={email}
               onChange={onChange}
                
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
               onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={avatarPreview}
                              className='rounded-circle'
                              alt='Avatar Preview'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          accept="images/*"
                         onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
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