import { json } from "express";

class Apifeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const keyword= this.queryStr.keyword?{
           name:{
               $regex: this.queryStr.keyword,
               $options: 'i'
           }
        }:{}
//console.log(keyword);
        this.query= this.query.find({...keyword});
        return this;
    }

    filter(){
        const querycopy= { ...this.queryStr};
    // removing fields from the query
        const removefield= ['keyword','limit','page'];
        removefield.forEach(el=>delete querycopy[el]);


// advance filter for price,ratings etc;

         let queryStr= JSON.stringify(querycopy)
         queryStr= queryStr.replace(/\b(gt|gte|lte|lt)\b/g,match=>  `$${match}`)
         console.log(queryStr);

        this.query= this.query.find(JSON.parse(queryStr));
       return this;
    }

    pagination(resPerpage)
    {
        const currentpage= Number(this.queryStr.page)||1;
        const skip= resPerpage*(currentpage-1);

        this.query= this.query.limit(resPerpage).skip(skip)
        return this;
    }

}

export default Apifeatures


