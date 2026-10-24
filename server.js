const express = require("express");
const app = express();

const fs = require("node:fs/promises");
const path = require("node:path");
const {randomUUID} = require("crypto");



const user_file = path.join(__dirname,"user.json")

async function readUser() {
    const data = await fs.readFile(user_file,"utf8");
    return JSON.parse(data)
}

async function writeUser(user) {
    await fs.writeFile(user_file,JSON.stringify(user,null,2),"utf8")
}

app.get("/",(req,res)=>{
    res.status(200).json("WELCOME TO HOME PAGE")
})

app.use(express.json())

app.post("/users",async(req,res)=>{
    const users = await readUser();
    const newUser = {
        id:randomUUID(),
        name:req.body.name,
        age:req.body.age
    }
    users.push(newUser)
    await writeUser(users);
    res.status(201).json({success:true,message:"Created succesfully"})
})

app.get("/users",async(req,res)=>{
    const users = await readUser();
    res.status(200).json({success:true,data:users})
})

app.get("/users/:id",async (req,res)=>{
    const users = await readUser();
    const user = users.find(user=>user.id===req.params.id);
    if(!user){
        return res.status(404).json("User not found")
    }
    res.status(200).json({success:true,data:user})
})

app.patch("/users/:id",async(req,res)=>{
    const users = await readUser();
    const index = users.findIndex(user=>user.id===req.params.id);
    
    const user = users[index];

    if(req.body.name!==undefined){
        user.name = req.body.name
    }
    if(req.body.age!==undefined){
        user.age = req.body.age
    }

    await writeUser(users)
    res.status(201).json(user);
})

app.delete("/users/:id",async(req,res)=>{
    const users = await readUser()
    const filtered = users.filter(user=>user.id!==req.params.id);

    await writeUser(filtered)
    res.status(200).json(filtered);
})

app.listen(3000,()=>{
    console.log("server is running on: http://localhost:3000");
})