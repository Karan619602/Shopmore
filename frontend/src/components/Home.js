import React, { useState,useEffect } from 'react'
import { Fragment } from 'react'
import Pagination from 'react-js-pagination' 
import Metadata from './layout/Metaata'
import { useDispatch,useSelector } from 'react-redux'
import  {getproducts}  from './actions/productsactions.js'
import { Product } from './Product/product'
import { Loader } from './layout/loader'
import { useAlert } from 'react-alert'
const Home=({match})=>{

     const [currentPage,setcurrentPage]=useState(1);


  const alert=useAlert();
  const dispatch=useDispatch();
const {loading,Products,error,productsCount,resPerPage} =useSelector(state=>state.products)
 const keyword=match.params.keyword
 
  useEffect(()=>{
    if(error){
      return alert.error(error);
    }
    dispatch(getproducts(keyword,currentPage));
    
    
  },[dispatch,alert,error,keyword,currentPage])

  function setCurrentPageNo(PageNumber){
    setcurrentPage(PageNumber)
  }
    return(
        

        <Fragment>
          {loading?<Loader/>:
          <Fragment>
            <Metadata title={'Buy best products'}/>

           <h1 id="products_heading"> Products</h1>

            <section id="products" className=" container mt-10 change" >
            <div className="row ">
                {Products &&Products.map(product=>(
                    <Product key={product._id} product={product}/>

                    ))}


             </div>
             </section>

      {resPerPage<=productsCount && (
                <div className="d-flex justify-content-center mt-5 pagination" >
                <Pagination
                   activePage={currentPage}
                   itemsCountPerPage={resPerPage}
                   totalItemsCount={productsCount}       
                     onChange={setCurrentPageNo}
                   nextPageText={'Next'}
                   prevPageText={'Prev'}
                   firstPageText={'First'}
                   lastPageText={'Last'}
                   itemClass="page-item"
                   linkClass="page-link"
                />
                </div>
      )}
     
            </Fragment>}
        
        
        </Fragment>
    )
}

export default Home