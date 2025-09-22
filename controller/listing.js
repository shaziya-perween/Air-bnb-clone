
const Listing=require("../models/listing.js");

module.exports.index = async(req,res)=>{
    const allListings=await Listing.find({}).lean();
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.createNewListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
   const newListing = new Listing(req.body.listing);
   newListing.owner = req.user._id;
   newListing.image = {url,filename};
   await newListing.save();
   req.flash("success","New Listing added");
   res.redirect("/listings");
};

module.exports. showListing = async(req,res)=>{
  let{id}=req.params;
  console.log(id);
  const listing = await Listing.findById(id).populate(
    {
        path:"reviews",
        populate:{
            path:"author"
        },
    })
        .populate("owner").lean();
  if(!listing){
    req.flash("error","listing not found");
    res.redirect("/listings");
  }
   res.render("listings/show.ejs",{listing});
};

module.exports.renderEditForm  = async (req,res)=>{
    let{id}=req.params;
    const listing = await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing = async(req,res)=>{
   let{id}=req.params;
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing},{new:true});
   if(typeof req.file !=="undefined"){
     let url = req.file.path;
     let filename = req.file.filename;
     listing.image ={url,filename};
     await listing.save();
   }
   req.flash("success","listing updated");
   res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req,res)=>{
    let{id}=req.params;
    console.log(id);
    const listing=await Listing.findByIdAndDelete(id);
    if(!listing){
        req.flash("error","listing not found");
    }
    res.redirect("/listings");
};
module.exports.HotelsListing = async(req,res)=>{
    const filter = await Listing.find({category:"Hotels"});
    res.redirect("listings/Hotels");
    console.log(filter);
};