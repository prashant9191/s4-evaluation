const express=require("express");
const {userModel}=require("../models/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userRouter=express.Router();
const app=express();
app.use(express.json());

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body;
    try {
       const check=await userModel.find({email});
       if(check.length===0){
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({msg:"something went wrong",error:err.message})
            }else{
                const User=new userModel({name,email,gender,password:hash,age,city});
                await User.save();
                res.send({msg:"new user had been registered"})
            }
        })
       }else{
        res.send({msg:"user already exists"})
       }
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }

})

userRouter.post("/login",async(req,res)=>{
        const {email,password}=req.body;
        try {
           const user= await userModel.find({email}) ;
           if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token=jwt.sign({User:user[0]._id},"hell");
                    res.send({msg:"logged in",Token:token})
                }else{
                    res.send({msg:"something went wrong"})
                }
            })
           }else{
            res.send({msg:"wrong credentials"})
           }
        } catch (error) {
            res.send({msg:"something went wrong",error:error.message})
        }
})



module.exports={
    userRouter
}