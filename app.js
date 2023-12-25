const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const _=require("lodash");
const mongoose=require("mongoose");
const app=express();
const dbURI="mongodb://localhost:27017/PortfolioDB";
mongoose.connect(dbURI);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");



var globalobj= {};
var curser;
var stittle;
var scontent;
var sparameter;

const BlogSchema= new mongoose.Schema({
       _id:Number,
       tittle:String,
       content: String
});       

const Pointer= mongoose.model("iterator",{_id:Number,i:Number});

const Post= mongoose.model("BlogPost",BlogSchema);


app.get("/", async function(req,res){

    var count= await Pointer.find().countDocuments();
    if (count===0){
        const obje= new Pointer({
            _id:1,
             i:1
        });
        obje.save();
    }

    var curserinfo= await Pointer.find({_id:1});
    curser= curserinfo[0].i;
    res.render("main");
});


app.get("/Compose",function(req,res){
    res.render("Compose");
});


app.post("/Compose",async function(req,res){
    const post =new Post({
        _id:curser,
        tittle: req.body.tittle,
        content:req.body.content
    }); 
    curser++;
    const doc = await Pointer.findOneAndUpdate({_id:1}, {i:curser}, {
        new: true
      });
    post.save();
    globalobj= await Post.find();
    res.redirect("/Blog");
});


app.get("/About",function(req,res){
    res.render("About");
});

app.get("/main",function(req,res){
    res.render("main");
});


app.get("/Blog",async function(req,res){
    globalobj= await Post.find();
    res.render("Blog",{contentsarray:globalobj});
});
app.post("/Blog",function(req,res){
    var deleteID=req.body.deletebtn;
    Post.deleteOne({_id:deleteID}).then(function(){
        console.log(("data deleted"));
    });
    res.redirect("/Blog")
});

// app.get("/Blogs/:p", async function(req,res){
//     const blogtittle=req.params.p;
//     const blogdata= await Post.find();
//     blogdata.forEach(function(blog){
//         if(blog.tittle==blogtittle){
//             stittle=blog.tittle;
//             scontent=blog.content;
//             console.log(stittle);
//             console.log("Match foundddd");
//             res.render("individualBlog",{itittle:stittle,icontent:scontent}); 
//         }
//     });
//    res.send("<h1>Blog not found </h1>");
// });




// contact start
app.get("/Contact",function(req,res){
    res.render("Contact");
});

// contact end
app.listen(3000,function(){
    console.log("server running on port 3000");
});