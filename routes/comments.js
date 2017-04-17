var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comments');

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}


router.get("/new", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, foundCamp) {
    if(err) {
      console.log(err)
    } else {
        res.render("comments/new", {
          campground: foundCamp
        })
      }

  })
})

router.post("/", isLoggedIn, function(req, res) {
  Comment.create(req.body.comment, function(err, createdCom){
    Campground.findById(req.params.id, function(err, foundCamp){
      if(err){
        console.log(err)
      } else {
        createdCom.author.username = req.user.username;
        createdCom.author.id = req.user._id;
        createdCom.save()
        foundCamp.comments.push(createdCom);
        foundCamp.save();
        res.redirect('/campgrounds/'+ req.params.id);
      }
    })
  })
})

router.get('/:commentId/reply', isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, foundCamp){
    Comment.findById(req.params.commentId, function(err, foundCom){
      if(err){
        console.log(err)
      } else {
        res.render("comments/reply", {
          comment: foundCom,
          campground: foundCamp
        })
      }
    })
  })

})

router.post('/:commentId', isLoggedIn, function(req, res){
  Comment.findById(req.params.commentId, function(err, foundCom){
    if(err){
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, createdCom){
        if(err) {
          console.log(err);
        } else {
          createdCom.author.username = req.user.username;
          createdCom.author.id = req.user._id;
          createdCom.save();
          console.log(foundCom);
          foundCom.comments.push(createdCom);
          foundCom.save();
          console.log(foundCom);
          res.redirect('/campgrounds/' + req.params.id);
        }
      })
    }
  })
})

module.exports = router;
