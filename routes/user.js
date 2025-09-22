const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController = require("../controller/user.js");

const authenticate=(req,res,next)=>{
   passport.authenticate( "local",{
   failureRedirect:"/login",
   failureFlash:true
    })(req,res,next);
 };
    
  //signup Form
router.get("/signup",(userController.renderSignupForm));

  //submit signup
router.post("/signup", wrapAsync(userController.userSignup));
   //login form
router.get("/login",(userController.renderLoginForm));

   //submit login
router.post("/login", saveRedirectUrl,authenticate,(userController.userLogin));

    //user logout
router.get("/logout",(userController.userLogout));

module.exports=router;