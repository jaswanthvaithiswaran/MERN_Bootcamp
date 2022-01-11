import React,{useState} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import goBack from "./goBack";
import { createCategory } from "./helper/adminapicall";



const AddCategory = ()=>{

    const [name,setName] = useState("")
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    const {user,token} = isAuthenticated();

    const handleChange = event =>{
        setError("");
        setName(event.target.value)
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true)
            }
            else
            {
                setError("")
                setSuccess(true)
                setName("")
            }
        })

    }
    const successMessage =()=>{
        if(success)
        {
            return <h4 className="text-success">Category created successfully</h4>
        }
    }
    const warningMessage=()=>{
        if(error)
        {
            return <h4 className="text-warning">Failed to add category</h4>

        }
    }
    

    const CategoryForm = ()=>{
        return (
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input type="text" className="form-control my-1" onChange={handleChange} value={name} autoFocus required placeholder="Ex. summer" />
                <button className="btn btn-outline-info mb-5" onClick={onSubmit}>create category</button>
            </div>
        </form>
        )
    }

    return(
        <Base>
        <div className="row bg-white rounded mt-5">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {warningMessage()}
                {goBack()}
                {CategoryForm()}
            </div>
        </div>
        </Base>
    )
}

export default AddCategory;