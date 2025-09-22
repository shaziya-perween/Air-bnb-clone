const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const session=require("express-session");
app.use(session({secret:"mysupersecretkey",resave:false,saveUninitialized:true,}));
const flash=require("connect-flash");
const path=require("path");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


app.use(cookieParser("secretcode"));
app.use(flash());




app.get("/name",(req,res)=>{
    let{name}=req.query;
    req.session.name=name;
    req.flash("success","user added successfully");
    console.log(req.session);
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("page",{name:req.session.name,msg:req.flash("success")});
});
app.get("/getcookie",(req,res)=>{
    res.cookie("greet","hello");
    res.send("send you some cookie");
});

app.get("/getsignedcookie",(req,res)=>{
    res.cookie("color","red",{signed:true});
    res.send("done");
    console.log(req.cookies);
});
app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verify");
})


app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.send("hello i am a root");
});


app.listen(8080,()=>{
    console.log("server is listening to 8080");
})