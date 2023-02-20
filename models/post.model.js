const mongoose=require("mongoose");
const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true},
    no_if_comments:{type:Number,required:true},
    owner:{type:String}
});
const postModel=mongoose.model("post",postSchema);
module.exports={
    postModel
}