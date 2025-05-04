const express = require("express");
const app=express();
const path=require("path");
const mongoose = require("mongoose");
var methodOverride = require('method-override');

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));

const Chat = require("./models/chats");
mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });
app.get('/chats',async (req,res)=>{
  let chats=await Chat.find();
  console.log(chats)
  res.render("index.ejs",{chats});
});
app.get('/chats/new',(req,res)=>{
  res.render("new.ejs");
});
app.post('/chats',(req,res)=>{
  let {from,msg,to}=req.body;
  let newchat=new Chat({
    from:from,
    msg:msg,
    to:to,
    created_at:new Date(),
  })
  newchat.save()
  .then(()=>{
    console.log("chat was saved");
  })
  .catch((err)=>{
    console.error("failed to save");
  })
  res.redirect("/chats");
});
app.get("/chats/:id/edit",async(req,res)=>{
  let {id}=req.params;
  let chat=await Chat.findById(id);
  res.render("edit.ejs",{chat});
});
app.put("/chats/:id",async (req,res)=>{
  let {id}=req.params;
  let {msg : newMsg}=req.body; //to rename the msg to newMsg we write in key value pair 
  console.log(newMsg);
  let updatedchat=await Chat.findByIdAndUpdate(
    id,
    {msg : newMsg},
    {runValidators:true,new:true});
    console.log(updatedchat);
    res.redirect("/chats");
});
app.delete("/chats/:id",async (req,res)=>{
  let {id}=req.params;
  let deletedchat=await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});
app.listen(8080,()=>{
    console.log("listening to port 8080");
});