const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const _=require("lodash");
const mongoose=require("mongoose");

const app=express();
mongoose.connect("mongodb://localhost:27017/PortfolioDB");



const BlogSchema= new mongoose.Schema({
       _id:Number,
       tittle:String,
       content: String
});
// const iteratorSchema=new mongoose.Schema({
//     _id:Number,
//     iterator:Number
// });

const Post= mongoose.model("BlogPost",BlogSchema);
const Iterator=mongoose.model("iter",{i:Number});

const ids= new Iterator({
    i:1
});
ids.save();


var globalobj= {};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");


app.get("/",function(req,res){
    res.render("main");
});


app.get("/Compose",function(req,res){
    res.render("Compose");
});

var num=1;

app.post("/Compose",async function(req,res){
    const post =new Post({
        _id:num,
        tittle: req.body.tittle,
        content:req.body.content
    }); 
    num++;
    post.save();
    globalobj= await Post.find();
    res.redirect("/Blog");
});


// app.post("/add",function(req,res){
//     res.render("Compose");
// });

app.get("/About",function(req,res){
    res.render("About");
});

app.get("/main",function(req,res){
    res.render("main");
});


app.get("/Blog",function(req,res){
    res.render("Blog",{contentsarray:globalobj});
});



// contact start
app.get("/Contact",function(req,res){
    res.render("Contact");
});

// contact end
app.listen(3000,function(){
    console.log("server running on port 3000");
});