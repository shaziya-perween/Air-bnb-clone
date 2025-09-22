const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const{isOwner,isLoggedIn} = require("../middleware.js");
const listingController = require("../controller/listing.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});



//validation schema for client side
const validateListing=(req,res,next)=>{
    let{error} = listingSchema.validate(req.body);
     if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

//index route
router.get("/",wrapAsync(listingController.index));

//new route
router.get("/new",isLoggedIn,(listingController.renderNewForm));

router.post(
    "/new",
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
     wrapAsync(listingController.createNewListing)
    );
   
    //show route
router.get("/:id",wrapAsync(listingController.showListing));

  //edit route
router.get(
    "/:id/edit",
    isLoggedIn ,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);
  
   //update route
router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
);

    //delete route
router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
);
router.get(
    "/Hotels",
    isLoggedIn,
    wrapAsync(listingController.HotelsListing)

);

module.exports=router;