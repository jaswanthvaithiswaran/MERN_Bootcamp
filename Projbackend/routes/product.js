const express = require("express");
const router = express.Router();

//importing controllers
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {getProductById,
    createProduct,
    getProduct,
    photo,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategory
} = require("../controllers/product");

//dynamic routers params
router.param("userId",getUserById);
router.param("productId",getProductById);

//acutal routers
//creating product
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

//read product route
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete route
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);

// update route
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);


//listing route
router.get("/products",getAllProducts);
router.get("products/category",getAllUniqueCategory);

module.exports = router;