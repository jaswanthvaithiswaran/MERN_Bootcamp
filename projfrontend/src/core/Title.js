import React from "react";
import "../Styles/title.css"
const Title = ({
    heading='title',
    children,
   
})=>{
    return (
        <div className="title">
             <h1>{heading}</h1>
        </div>
    )
}
export default Title;