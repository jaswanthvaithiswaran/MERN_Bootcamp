import React,{useState} from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import ImageHelper from "./helper/ImageHelper";
import { addItemsToCart } from "./helper/CartHelper";
const Card = ({product},addtoCart=true,removeFromCart=false) => {


    const cardTitle = product?product.name:"Default name";
    const cardDescription = product?product.description:"default description";
    const cardPrice = product ?product.price:"default price";

    const [redirect,setRedirect] = useState(false);


    const addToCart = ()=>{
      addItemsToCart(product,()=> setRedirect(true))
    } 

    const getARedirect = redirect=>{
      if(redirect){
       return( <Redirect to="/cart"></Redirect>)
      }
    }
    const showAddtoCart = addtoCart =>{
        return (
            addtoCart && (<button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2">
                Add to Cart
              </button>)
        )
    }

    const showRemoveFromCart = removeFromCart=>{
        return (
            removeFromCart && (<button
                onClick={() => {}}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>)
        )
    }

    return (
      <div className="card text-dark bg-white border border-info shadow text-center">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          {getARedirect(redirect)}
        <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddtoCart(addtoCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card;