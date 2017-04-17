var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require("./models/comments");

var data = [
  {
    name: "Fancy Camp",
    image: "http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg",
    description: "This is a fancy campground, with a very unfancy description"
  },
  {
    name: "Rural Camp",
    image: "http://hdwallpapershdpics.com/wp-content/uploads/2016/09/Dubai-Photos-Images-Travel-Tourist-Images-Pictures-800x600.jpg",
    description: "This is totally a campground in the village, look at those huts."
  },
  {
    name: "Forest Camp",
    image: "https://wallpaperbrowse.com/media/images/Dubai-Photos-Images-Oicture-Dubai-Landmarks-800x600.jpg",
    description: "Don't get fooled, those are rich men's trees. This is a forest camp."
  }
]

function seedDB(){

  Campground.remove(function(err){
    if(err){
      console.log(err);
    } else {
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
            console.log(err);
          } else {
            console.log("Added a campground");
            // Create a comment
            Comment.create({
              text: "Is this really a campground, where do I put my tent?",
              author: "Home"
            }, function(err, comment){
              if(err){
                console.log(err);
              } else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created new comment");
              }
            })
          }
        })

      })
  }
  })

}

module.exports = seedDB;
