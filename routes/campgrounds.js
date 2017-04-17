'use strict';
var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}

router.get('/', function(req, res){
  console.log(req.user);
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
     res.render('campgrounds/index', {
       campData: allCampgrounds,
       currentUser: req.user
      });
    }
  })

})

// Form route
router.get('/new', isLoggedIn, function(req, res) {
      res.render('campgrounds/new');
})

// Create a new post route
router.post('/', isLoggedIn, function(req, res){
   Campground.create(req.body.campground, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      allCampgrounds.author.id = req.user._id;
      allCampgrounds.author.username = req.user.username;
      allCampgrounds.save();
      res.redirect('/campgrounds');
    }
   })
})

// Read more route
router.get('/:id', function(req, res){
  Campground.findById(req.params.id).populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'comments',
      model: 'Comment'
    }
  }).exec(function(err, foundCamp){
      err ? console.log(err) :  res.render('campgrounds/show', {campground: foundCamp});
  })
})

module.exports = router;
