import React from 'react';
import "../Styles/Navstyle.css";
import Menu from "./Menu"

const Base =({
    title='Jkart',
    children,
   
})=>{
    return(
        <>
       <Menu/>
        <div>
                <div>{children}</div>
                
            </div></>
    )
}
export default Base;