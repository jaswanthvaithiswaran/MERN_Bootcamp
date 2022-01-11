import React ,{useState,useEffect} from "react";
import Base from "../core/Base";
import goBack from "./goBack";
import { isAuthenticated } from "../auth/helper";
import { getCategory, updateCategory } from "./helper/adminapicall";



const UpdateCategory =({match})=>{

    const [name,setName] = useState("")
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)
    const [updatedCategory,setupdatedCategory]= useState("")
    const {user,token} = isAuthenticated();

    const handleChange = event =>{
        setError("");
        setName(event.target.value)
    }

    const onUpdate = (event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);
        updateCategory(match.params.categoryId,user._id,token,name).
        then(data=>{
            if(data.error)
            {
                setError(data.error);
            }
            else
            {
                setupdatedCategory(data.name);
                setSuccess(true);
            }
        })

    }
    const successMessage =()=>{
        if(success)
        {
            return <h4 className="text-success">{updatedCategory} updated successfully</h4>
        }
    }
    const warningMessage=()=>{
        if(error)
        {
            return <h4 className="text-warning"> {error} Failed to update category</h4>
        }
    }

    const preloadCategory = (categoryId)=>{
        getCategory(categoryId).then(data=>{
            if(data.error)
            {
                console.log(data.error);
            }
            else
            {
                setName(data.name);
            }
        })
    }
    useEffect(()=>{
        preloadCategory(match.params.categoryId)
    },[])
    const UpdateCategoryForm = ()=>{
        return(
            <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input type="text" className="form-control my-1" onChange={handleChange} value={name} autoFocus required placeholder="Ex. summer" />
                <button className="btn btn-outline-success mb-5 button" onClick={onUpdate}>Update category</button>
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
                {UpdateCategoryForm()}
            </div>
        </div>
        </Base>
    )
}

export default UpdateCategory;