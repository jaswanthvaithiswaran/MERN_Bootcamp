const express = require("express");
const router = express.Router();

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory} = require("../controllers/category");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//param routes middlewares
router.param("userId",getUserById );
router.param("categoryId",getCategoryById);

//create category route have to be admin
router.post("/category/create/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
createCategory
);

// read routes normal user
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

//update route 
router.put("/category/:categoryId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
updateCategory
);
//delete route
router.delete("/category/:categoryId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
removeCategory
);



module.exports = router;