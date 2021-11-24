const express = require("express")

const app = express()

const port = 8080;

const isadmin = (req,res,next)=>{
        console.log("Yes admin");
        next();
}

const isloggedin = (req,res,next)=>{
    console.log("Yes logged in");
    next();
}
const admin = (req,res)=>{
    return res.send("Hi admin dashboard");
}


app.get('/admin',isadmin,isloggedin,admin);

app.get('/',(req,res)=>{
    return res.send("hi jaswanth");
});

app.get('/login',(req,res)=>{
    return res.send("hi User login");
});

app.listen(port,()=>{
    console.log("Server is running");
});