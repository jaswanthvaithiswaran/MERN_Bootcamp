import React from "react";
import { Link } from "react-router-dom";

const goBack = ()=>{
    return (
        <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin home</Link>
    </div>
    )
}
export default goBack;
