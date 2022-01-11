import React from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";
const AdminDashboard = ()=>{

    const {user:{name,email,role}}=isAuthenticated();

    const adminLeftSide = ()=>{
        return(
            <div className="card shadow ">
                <h4 className="text-center card-header bg-dark text-white">Admin Navigations</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link text-info text-center" to="/admin/create/category">Create Category</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info text-center" to="/admin/categories">Manage Category</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info text-center" to="/admin/create/product">Create Product</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info text-center" to="/admin/products">Manage Products</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info text-center" to="/admin/orders">Manager Orders</Link>
                </li>
            </ul>
            </div>
        )
    }

    const adminRightSide = ()=>{
        return(
            <div className="shadow card ">
                <h4 className="card-header">Admin Information</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="badge badge-primary mr-2 text-dark">Name:</span> {name}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-success mr-2 text-dark">Email:</span> {email}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-danger text-dark">Admin area</span>
                </li>


            </ul>
            </div>
        )
    }

    return(
        <Base className="container  p-5">
        <div className="row mt-5">
            <div className="col-2">

            </div>
            <div className="col-3">
            {adminLeftSide()}
            </div>
            <div className="col-6">
            {adminRightSide()}
            </div>
        </div>
        
       
        </Base>
    )
}

export default AdminDashboard;