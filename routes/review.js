const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const { isLoggedIn,isAuthor } = require("../middleware.js");
const reviewController = require("../controller/review.js");




const validateReview=(req,res,next)=>{
    let{error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

//submit review
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.submitReview)
);

//delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports=router;