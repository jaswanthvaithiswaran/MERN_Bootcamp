import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import {deleteProduct, getProducts} from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Title from "../core/Title";


const ManageProducts = ()=>{

  const {user,token} = isAuthenticated();
  const [products,setProducts] = useState([]);

  const preload = ()=>{
    getProducts().then(data =>{
      if(data.error){
        console.log(data.error);
      }
      else
      {
        setProducts(data);
      }
    })
  }
  useEffect(()=>{
    preload();
  },[])

  const onDelete =productId =>{
    deleteProduct(productId,user._id,token).then(data=>{
      if(data.error){
        console.log(data.error);
      }
      else
      {
        preload();
      }
    })
  }

    const ManageProductsForm = ()=>{
        return(
          <>
          <div className="row mt-5">
        <div className="bg-white text-dark">   
        
      <Title heading="All products"></Title>
      </div>
      </div>
      <div className="row bg-white mt-5 mb-5">
      
        <div className="col-9 offset-md-2">
        <Link className="btn btn-success" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
          <h3 className="text-center  my-3">Total {products.length} products</h3>

          {products.map((product,index)=>(
            <div key = {index} className="row bg-info text-center mb-5 border border-success pt-2 pb-2">
            <div className="col-3 offset-md-2">
              <h5 className=" text-left">{product.name}</h5>
            </div>
            <div className="col-3">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/${product._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-3">
              <button onClick={() => {onDelete(product._id)}} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
          ))}
        </div>
      </div>
      </>
        )
    }

    return(
        <Base >
        {ManageProductsForm()}
        </Base>
    )
}
export default ManageProducts;