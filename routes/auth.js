var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var Campground = require('../models/campground');


router.get('/', function(req, res) {
  res.render('landing');
})




// Authorisation ROUTES

// Signup Routes
router.get('/register', function(req, res){
  res.render('register');
})

// Creating new user route

router.post('/register', function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/campgrounds')
    })
  });
})

// Login Routes

router.get('/login', function (req, res) {  
  res.render('login');
})

router.post('/login', passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: '/login'
  }))

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}

module.exports = router;
