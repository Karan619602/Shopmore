import  mongoose  from "mongoose"

const connectdatabase =()=>{
   mongoose.connect(process.env.CONNECTION_URL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    }).then( (con)=>{
console.log(`connect to database : ${con.connection.host}`);
    })
}

export default connectdatabase;