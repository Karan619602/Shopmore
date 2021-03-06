import express from 'express';
const app=express();
import connectdatabase from './config/database.js';
import errormiddleware from './middlewares/errors.js'
import bodyParser from 'body-parser';
import  cloudinary  from 'cloudinary';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv  from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());



const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

if (process.env.NODE_ENV !== 'PRODUCTION') 
{dotenv.config({ path: 'backend/config/config.env' })}

//handle uncaught error
process.on("uncaughtException",err=>{
    console.log(`ERROR: ${err.stack}`);
    console.log("shutting down the server due to the uncaughtException");
    process.exit(1);
})


connectdatabase();
//cloudinary config
cloudinary.config({
    cloud_name:process.env.Cloud_Name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})

import products from './routers/products.js';
import users from './routers/usersroutes.js';
import payment from './routers/payment.js';

import orders from './routers/orderroutes.js';




app.use('/api/v1', products);
app.use('/api/v1',users);
app.use('/api/v1',payment);
app.use('/api/v1',orders);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname,'../frontend/build'))) 

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
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