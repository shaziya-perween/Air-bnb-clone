if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
const User=require("./models/user.js");
const session=require("express-session");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const user=require("./routes/user.js");
const {isLoggedIn}=require("./middleware.js");

const cookieParser=require("cookie-parser");
const flash=require("connect-flash");




app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
main()
.then((res)=>{
    console.log("connected");
})
.catch(err => console.log(err)
);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');

}
let port=3000;
const sessionOptions={
    secret:"mysupersecretkey",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,

    }




}



app.use(session(sessionOptions));
app.use(cookieParser("secretcode"));
app.use(flash());
app.use(passport.initialize());// initilize pass
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",user);

app.get("/test",(req,res)=>{
    throw new ExpressError(404,"page not found");
});
app.use((err,req,res,next)=>{
    let{status=400,message="bad request"}=err;
    res.status(status).render("error.ejs",{status,message});
});

app.listen(port,()=>{
    console.log(`server is listening on port,${port}`);
});
