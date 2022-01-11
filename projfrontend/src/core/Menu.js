import React, {Fragment} from "react";
import {Link,withRouter} from "react-router-dom";
import { signout,isAuthenticated } from "../auth/helper";


const currentTab = (history,path)=>{
    if(history.location.pathname===path)
    {
        return {color:"#ffffff"
    };
    }
   else
   {
       return {
           color: "#1B1E1F"
       };
   }
}

const Menu= (
    {   
        title="Jkart",
        history
    }
)=>{
    return (
    <div className="navbar">
    <div className="leftside">
       <Link to="/" className="route"> <h4>{title}</h4></Link>
    </div>
    <div className="rightside">
        <Link className="route" to="/" style={currentTab(history,"/")}>Home</Link>
        <Link className="route" to="/cart" style={currentTab(history,"/cart")}>Cart</Link>

        {isAuthenticated() && isAuthenticated().user.role===0 && (<Link className="route" to="/user/dashboard" style={currentTab(history,"/user/dashboard")}>Dashboard</Link>)}


        {isAuthenticated() && isAuthenticated().user.role===1 && (<Link className="route" to="/admin/dashboard" style={currentTab(history,"/admin/dashboard")}>A.Dashboard</Link>)}
        
        {!isAuthenticated() && 
        ( <Fragment>
        <Link className="route" to="/signup" style={currentTab(history,"/signup")}>Signup</Link>
        <Link className="route" to="/signin" style={currentTab(history,"/signin")}>Signin</Link>
        </Fragment>)
        }

        {isAuthenticated() && ( <span className="route" onClick={()=>{
            signout(()=>{
                history.push("/")
            })
        }}>Signout</span> )}

    </div>
</div>
    );
}
export default withRouter(Menu);