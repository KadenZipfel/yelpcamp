var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
  {
    name: "Cloud's Rest",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/08/99/c4/84/10-shady-lovely-campsites.jpg",
    description: "Lorem ipsum dolor amet hella kinfolk tattooed, disrupt authentic hoodie health goth gastropub. Franzen green juice sartorial semiotics swag. Shabby chic cardigan taiyaki venmo succulents portland forage godard vexillologist truffaut blue bottle blog. Sriracha scenester four loko, yuccie chillwave skateboard disrupt humblebrag vaporware. Flannel meggings pabst heirloom edison bulb cold-pressed enamel pin umami etsy drinking vinegar locavore cloud bread tofu."
  },
  {
    name: "Desert Mesa",
    image: "http://www.onguma.com/uploads/6/2/0/8/6208718/201604-aoba-935_orig.jpg",
    description: "Lorem ipsum dolor amet hella kinfolk tattooed, disrupt authentic hoodie health goth gastropub. Franzen green juice sartorial semiotics swag. Shabby chic cardigan taiyaki venmo succulents portland forage godard vexillologist truffaut blue bottle blog. Sriracha scenester four loko, yuccie chillwave skateboard disrupt humblebrag vaporware. Flannel meggings pabst heirloom edison bulb cold-pressed enamel pin umami etsy drinking vinegar locavore cloud bread tofu."
  },
  {
    name: "Canyon Floor",
    image: "https://www.oars.com/wp-content/uploads/2014/07/Rogue-JamesKaiser-570.web_-1024x684.jpg",
    description: "Lorem ipsum dolor amet hella kinfolk tattooed, disrupt authentic hoodie health goth gastropub. Franzen green juice sartorial semiotics swag. Shabby chic cardigan taiyaki venmo succulents portland forage godard vexillologist truffaut blue bottle blog. Sriracha scenester four loko, yuccie chillwave skateboard disrupt humblebrag vaporware. Flannel meggings pabst heirloom edison bulb cold-pressed enamel pin umami etsy drinking vinegar locavore cloud bread tofu."
  }
  ]
    
function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    else {
      console.log("Removed campgrounds!")
      //Add a few campgrounds
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
            console.log(err);
          }
          else {
            console.log("Added a campground");
            //Create a comment
            Comment.create(
              {
                text: "This place is great, but I wish there was internet.",
                author: "Homer"
              }, function(err, comment){
                if(err){
                  console.log(err);
                }
                else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("Created new comment");
                }
              });
          }
        });
      });
    }
  });
  //Add a few comments
}

module.exports = seedDB;