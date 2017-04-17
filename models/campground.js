var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campgroundSchema = new Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    username: String  
  }
})

module.exports = mongoose.model('Campground', campgroundSchema);
