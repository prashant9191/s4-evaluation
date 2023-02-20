const express=require("express");
const {postModel}=require("../models/post.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const postRouter=express.Router();
const app=express();
app.use(express.json());

postRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization;
    const Device=req.query.device;

    if(token){
        jwt.verify(token,"hell",async(err,decoded)=>{
            if(decoded){
                let  posts;
                if(Device){
                    posts=await postModel.find({owner:decoded.User,device:Device})
                }else{
                    posts=await postModel.find({owner:decoded.User})
                } 
                res.send(posts)
            }else{
                res.send({msg:"wrong token"});
            }
        })
    }else{
        res.send({msg:"login first"})
    }
})


postRouter.post("/create",async(req,res)=>{
    try {
      const post=req.body;
      const newpost=new postModel(post);
                await newpost.save();
                res.send({msg:"new post has been created"})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})


postRouter.patch("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const paylod=req.body;
        await postModel.findByIdAndUpdate(id,paylod)
        res.send({msg:`note with id ${id} has been updated`})

    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})

postRouter.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await postModel.findByIdAndDelete({ _id: id });
      res.send({msg:`post with id ${id} has been deleted`});
    } catch (error) {
      res.send({ msg: "something went wrong", error: error.message });
    }
  });
  

module.exports={
    postRouter
}