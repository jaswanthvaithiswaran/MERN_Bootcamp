import React  from "react";
import "../Styles/Basestyles.css";
import {API} from "../backend";
import Base from "./Base";
export default function Home(){
    console.log("API is ",API);
    return(
        <Base>
            <div className="row">
                <div className="col-4">
                    <div className="btn btn-success">Test</div>
                </div>
                <div className="col-4">
                <div className="btn btn-success">Test</div>
                </div>
                <div className="col-4">
                <div className="btn btn-success">Test</div>
                </div>

            </div>
        </Base>
    )
}