const Listing=require("./models/listing.js");
const Review=require("./models/review.js");

const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Please LogIn First");
       return res.redirect("/login");
    }
    next();

}

const saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

const isOwner=async(req,res,next)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you don't have access for this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();

}
const isAuthor=async(req,res,next)=>{
    let{id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you don't have access for this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();

}


module.exports = { isLoggedIn, saveRedirectUrl,isOwner,isAuthor };