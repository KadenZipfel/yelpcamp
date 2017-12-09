var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//INDEX - Show all campgrounds
router.get("/", function(req, res){
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }
    else {
      res.render("campgrounds/index", {campgrounds:allCampgrounds});
    }
  });
});

//NEW - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

//CREATE - Add new campground to db
router.post("/", middleware.isLoggedIn, function(req, res){
  //Get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, price: price, image: image, description: description, author: author}
  
  //Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    }
    else {
      //Redirect back to campgrounds page
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
  });
});

//SHOW - Shows more info about campground
router.get("/:id", function(req, res){
  //Find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else {
      console.log(foundCampground);
      //Render show template with the provided info
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
  req.params.id
});

//Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  //Find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  //Redirect to show page
});

//Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;