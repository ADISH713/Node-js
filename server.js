// express example

const express = require("express");

const app = express();

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Welcome to TORQUE RC");
});

app.get('/products',(req,res)=>{
    res.json([
        {id:1,name:"Drift RC"},
        {id:2,name:"Off road RC"}
    ])
});

app.listen(5000,()=>{
    console.log("server running at http://localhost:5000")
})