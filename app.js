'use strict';
var express = require('express');
var app = express();

var Campground = require('./models/campground');
var seedDB = require('./seeds');
var Comment = require('./models/comments');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');



// seedDB(); //seed the database
mongoose.connect('mongodb://localhost/camps');


app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Passport Configuration

app.use(require('express-session')({
  secret: "I don't know really",
  resave: false,
  saveUninitialized: false
}))




app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var commentsRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/auth');

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})

app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);

app.listen(3001, 'localhost', function(){
  console.log("Express server listening on port 3001");
})
