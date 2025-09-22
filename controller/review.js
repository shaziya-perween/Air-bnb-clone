const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.submitReview = async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview._id);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
    console.log(newReview);
};

module.exports.destroyReview = async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
};
