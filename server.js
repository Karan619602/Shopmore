import express from 'express';
const app=express();
import connectdatabase from './backend/config/database.js';
import errormiddleware from './backend/middlewares/errors.js'
import bodyParser from 'body-parser';
import  cloudinary  from 'cloudinary';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv  from 'dotenv';
import path  from 'path';



import cors from 'cors';
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors());



// const __filename=fileURLToPath(import.meta.url)
// const __dirname=path.dirname(__filename)

// if (process.env.NODE_ENV !== 'PRODUCTION') 
 
//{dotenv.config({ path: 'backend/.env' })}


//handle uncaught error
process.on("uncaughtException",err=>{
    console.log(`ERROR: ${err.stack}`);
    console.log("shutting down the server due to the uncaughtException");
    process.exit(1);
})

{dotenv.config({ path: 'backend/config/.env' })}
connectdatabase();


import products from './backend/routers/products.js';
import users from './backend/routers/usersroutes.js';
import payment from './backend/routers/payment.js';

import orders from './backend/routers/orderroutes.js';




app.use('/api/v1', products);
app.use('/api/v1',users);
app.use('/api/v1',payment);
app.use('/api/v1',orders);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.resolve("frontend","build"))) 

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("frontend","build","index.html"))
    })
}
app.use(errormiddleware);




const port =process.env.PORT||8000
const server=app.listen(port,(err)=>{
    console.log(`server start on port :${port}`);

})
//unhandledRejection
process.on("unhandledRejection",err=>{
    console.log(`ERROR:${err.stack}`);
    console.log('shutting down the server due to unhandledRejection');
    server.close(()=>{
        process.exit(1);
    });

})