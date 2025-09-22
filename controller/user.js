const User=require("../models/user.js");

module.exports.renderSignupForm = async(req ,res)=>{
    res.render("users/signup.ejs");
};

module.exports.userSignup = async(req,res)=>{
    try{
        let{username,password,email}=req.body;
        const newUser= new User({email,username});
        const registerUser =await User.register(newUser,password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","signup successfull");
            res.redirect("/listings");
            });
        }catch(e){
        req.flash("error",e.message);
        res.render("users/signup.ejs");
       }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.userLogin = async(req,res)=>{
    req.flash("success","login successfully");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.userLogout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
};

