'use strict';
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
var campgrounds = [{
    name: 'Chandigarh',
    image: 'http://media.indiatimes.in/media/content/2016/Jan/chd4_1452155369.jpg'
  },
  {
    name: 'Nanda Devi',
    image: 'http://www.indiamike.com/india/attachments/84629d1473107737-nanda-devi-from-different-vantage-points-image.jpg'
  },
  {
    name: 'Leh Laddakh',
    image: 'http://revealthetech.com/wp-content/uploads/2016/07/124923_Labels-AMAZING-culture-HD-WALLPAPERS-india-leh-ladakh-LIFE_1600x1065-780x480.jpg'
  }
];

app.get('/', function(req, res) {
  res.render('landing');
})

app.get('/campgrounds', function(req, res) {
  res.render('campgrounds', {
    campData: campgrounds
  });
})

app.get('/campgrounds/new', function(req, res) {
  res.render('new');
})

app.post('/campgrounds', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {
    name: name,
    image: image
  };
  campgrounds.push(newCampground);
  res.redirect('/campgrounds');
})

app.listen(3001, 'localhost', function() {
  console.log("Server started");
})