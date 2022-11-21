const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
const directory = require("./routes/directory.js");
const todo= require("./routes/todo.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/directory", directory);
app.use("/todo-item", todo);


app.get("/",(req,res)=>{
  res.send("working fine")
})

app.listen(process.env.PORT, async () => {
  
  mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{console.log("connected")})
  .catch(()=>{
    console.log("error")
  })
  

 
  console.log("server started on", process.env.PORT);
});
