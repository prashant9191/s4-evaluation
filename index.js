const express=require("express");
const {connection}=require("./configs/db")
const {userRouter}=require("./routes/userRoutes")
const {postRouter}=require("./routes/postsRoutes")
const {authenticate}=require("./middleware/auth.middleware")
const cors=require("cors");
const app=express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/user",userRouter)
app.use(authenticate);
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`sever is running at http://localhost:4000/`)
})