const Listing= require("../models/listing.js");
const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken= process.env.MAP_TOKEN;
const geoCodingClient= mbxGeocoding({accessToken: mapToken});


module.exports.index=async (req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id)
        .populate({
            path:"reviews",
            populate:{
                path:"author"
            },
        })
        .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
    
};

module.exports.createListing= async(req,res,next)=>{

    let response=await geoCodingClient
        .forwardGeocode({
            query:req.body.listing.location,
            limit:1,
        })
        .send();


    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename);
    const newListing= new Listing(req.body.listing);
    newListing.owner= req.user._id;
    newListing.image={url,filename};

    newListing.geometry= response.body.features[0].geometry;

    let savedListing=await newListing.save();
    console.log(savedListing);
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
    
};

// module.exports.createListing= async(req,res,next)=>{
//     try {
//         const newListing = new Listing(req.body.listing);

//         // add cloudinary image if uploaded
//         if (req.file) {
//             newListing.image = {
//                 url: req.file.path,
//                 filename: req.file.filename,
//             };
//         }

//         // set the owner
//         newListing.owner = req.user._id;

//         await newListing.save();

//         req.flash("success","New Listing Created!");
//         res.redirect(`/listings/${newListing._id}`);
//     } catch (err) {
//         next(err);
//     }
// };

module.exports.editRenderForm= async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing= async(req,res)=>{
    
    let {id}= req.params;
    let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};

module.exports.index = async (req, res) => {
  const { search, category } = req.query;

  let query = {};
  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } }
      ]
    };
  }
  if (category) {
    query.title = { $regex: category, $options: "i" };
  }

  const allListings = await Listing.find(query);
  res.render("listings/index.ejs", { allListings, search, category });
};
