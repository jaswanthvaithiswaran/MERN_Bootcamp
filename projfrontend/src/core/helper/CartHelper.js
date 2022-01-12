export const addItemsToCart = (items,next)=>{
    let cart = [];
    if(typeof window !== undefined)
    {
        if(localStorage.getItem("cart"))
        {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({...items})
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }
}