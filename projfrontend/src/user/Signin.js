import React ,{useState} from "react";
import Base from "../core/Base";
import {Redirect } from "react-router-dom";
import {signin, isAuthenticated,authenticate} from "../auth/helper/index";
import "../Styles/signup.css"
import Title from "../core/Title";

const Signin = ()=>{
    const signInForm = ()=>{
        return (
                <div className="signupcontainer">
                    <Title heading='Signin'></Title>
                    <form >
                        <div className="form-group">
                            <label  className="text-dark">Email</label>
                            <input onChange={handleChange("email")} className="form-control" type="email" value={email}/>
                        </div>
                        <div className="form-group">
                            <label  className="text-dark">Password</label>
                            <input onChange={handleChange("password")} className="form-control" type="password" value={password} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-primary btn-block button">Submit</button>
                    </form>
                    
               </div>
        )
    }
    const [values,setValues]= useState({
        email:"jaswanthspyke@gmail.com",
        password:"12345678",
        error:"",
        loading:false,
        didRedirect:false,
    })
    const {email,password,loading,didRedirect,error} = values;

    const {user} = isAuthenticated();

    const handleChange = name =>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    };

    const loadingMessage = ()=>{
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    const errorMessage = ()=>{
        return(
            <div className="alert alert-danger" style={{display:error?"":"none"}}>
                {error} 
                 
            </div>
        );
    }

    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,didRedirect:true})
                })
            }
        })
        .catch(console.log("Signin failed"))
    } 

    const performRedirect = ()=>{
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard"/>
            }
            else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>;
        }
    }
    return(
        <Base>
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
        </Base>
    );
}

export default Signin;