import React,{useState,useEffect}from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, removeCategory } from "./helper/adminapicall";
import Title from "../core/Title";
import { isAuthenticated } from "../auth/helper";

const ManageCategories = ()=>{

    const {user,token} = isAuthenticated();
  const [categories,setCategories] = useState([]);

    const preload = ()=>{
        getCategories().then(data =>{
          if(data.error){
            console.log(data.error);
          }
          else
          {
            setCategories(data);
          }
        })
      }

    useEffect(()=>{
        preload();
      },[])
    
      const onDelete =categoryId =>{
        removeCategory(categoryId,user._id,token)
        .then(data=>{
            if(data.error)
            {
                console.log(data.error);
            }
            else
            {
                preload();
            }
        })
      }

    const ManageCategoriesForm = ()=>{
        return (
            <>
            <div className="row mt-5">
          <div className="bg-white text-dark">   
          
        <Title heading="All Categories"></Title>
        </div>
        </div>
        <div className="row bg-white mt-5 mb-5">
        
          <div className="col-9 offset-md-2">
          <Link className="btn btn-success" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
            <h3 className="text-center  my-3">Total {categories.length} categories</h3>
  
            {categories.map((category,index)=>(
              <div key = {index} className="row bg-info text-center mb-5 border border-success pt-2 pb-2">
              <div className="col-3 offset-md-2">
                <h5 className=" text-left">{category.name}</h5>
              </div>
              <div className="col-3">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-3">
                <button onClick={() => {onDelete(category._id)}} className="btn btn-danger">
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
    return (
        <Base>
        {ManageCategoriesForm()}
        </Base>
    )
}
export default ManageCategories;