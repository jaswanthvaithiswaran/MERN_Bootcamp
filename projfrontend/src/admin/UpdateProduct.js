import React,{useState,useEffect, useLayoutEffect} from "react";

import Base from "../core/Base";
import goBack from "./goBack";
import "../Styles/AddProductContainer.css"
import Title from "../core/Title";
import {getCategories, getProduct,updateProduct} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";



const UpdateProduct= ({match})=>{
  
  const {user,token} = isAuthenticated();

    const [values,setValues]= useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getaRedirect:false,
        formData:""
    })
    const {name,description,price,stock,photo,categories,category,loading,error,createdProduct,formData,getaRedirect}=values;
    
    const preload = (productId)=>{
      getProduct(productId).then(data =>{
        console.log(data);
        if(data.error){
          setValues({...values,error:data.error})
        }
        else{
            preloadCategories();
          setValues({
              ...values,
                name:data.name,
                description:data.description,
                price:data.price,
                stock:data.stock,
                category:data.category._id,
            formData:new FormData()})
          
        }
      })
    }

    const preloadCategories = ()=>{
        getCategories().then(data =>{
            console.log(data);
            if(data.error){
              setValues({...values,error:data.error})
            }
            else{
              setValues({categories:data,formData:new FormData()})
             
            }
          })
    }

    useEffect (()=>{
      preload(match.params.productId);
    },[]);

    const onUpdate = (event)=>{
        event.preventDefault();
        setValues({...values,error:"",loading:true})
        updateProduct(match.params.productId,user._id,token,formData)
        .then(data=>{
          if(data.error)
          {
            setValues({...values,error:data.error});
          }
          else
          {
            setValues({
              ...values,
              name:"",
              description:"",
              price:"",
              photo:"",
              stock:"",
              loading:false,
              createdProduct:data.name
            });
          }
        })
    }
    const handleChange = name=>event=>{
      
      const value = name ==="photo" ? event.target.files[0]: event.target.value;
      formData.set(name,value);
      setValues({...values,[name]:value});

    }

    const successMessage = ()=>(
      <div className="alert alert-success mt-3" style={{display:createdProduct?"":"none"}}>
        <h4>{createdProduct} Updated successfully</h4>
      </div>
    )

    const warningMessage = ()=>(
        <div className="alert alert warning mt-3" style={{display:error?"":"none"}}>
            {error}
        </div>
    )

    const createProductForm = () => (
        <form >
          
          <div className="form-group">
                <label className="form-label">Add a photo</label>
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((cate,index)=>(
                <option key={index} value={cate._id}>{cate.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onUpdate} className="btn btn-outline-success button">
            Update
          </button>
        </form>
      );

    return (
        <Base>
          <div className="AddProductContainer">
              <Title heading='Update product'></Title>
                {successMessage()}
                {warningMessage()}
                {goBack()}
                {createProductForm()}
            </div>
        </Base>
    )
}

export default UpdateProduct;