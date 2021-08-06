import Errorhandling from '../error/errorhandling.js'


 const errormiddleware =(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||'internal server error';

  res.status(err.statusCode).json({
      success: false,
      message:err.stack
  })
}

export default errormiddleware