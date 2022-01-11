import React ,{useState} from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import "../Styles/signup.css"
import { signup } from "../auth/helper";
import Title from "../core/Title";
const Signup = ()=>{

    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })
    const {name,email,password,error,success} = values;

    const handleChange = name =>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    };

    const onSubmit = event =>{
        event.preventDefault()
        setValues({...values,error:false})
        signup({name,email,password})
        .then(data=>{
            if(data.error)
            {
                setValues({...values,error:data.error,success:false})
            }
            else
            {
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                })
            }
        })
        .catch(console.log("Error in signup"))
    }


    const signUpForm = ()=>{
        return (
            
            
            <div className="signupcontainer">
            <Title heading='Signup'></Title>
                        <form >
                            <div className="form-group">
                                <label  className="text-dark">Name</label> <br></br>
                                <input className="form-control" onChange={handleChange("name")} type="text" value={name} />
                            </div>
                            <div className="form-group">
                                <label  className="text-dark">Email</label> <br></br>
                                <input className="form-control" onChange={handleChange("email")} type="email" value={email}/>
                            </div>
                            <div className="form-group">
                                <label  className="text-dark">Password</label><br></br>
                                <input className="form-control" onChange={handleChange("password")} type="password" value={password} />
                            </div>
                            <button className="btn btn-primary btn-block button" onClick={onSubmit}>Submit</button>
                        </form>
                   
            </div>
           
        )
    };

    const successMessage = ()=>{
        return(
            <div className="alert alert-success" style={{display:success?"":"none"}}>
                User created successfully 
                 <Link to="/signin">Login here</Link>
            </div>
        );
    }

    const errorMessage = ()=>{
        return(
            <div className="alert alert-danger" style={{display:error?"":"none"}}>
                {error} 
                 
            </div>
        );
    }

    return(
        <Base>
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        </Base>
    );
}

export default Signup;