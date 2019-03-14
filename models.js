////////////////
// IMPORT RELEVANT MODULES
////////////////

const mongoose = require('mongoose');

////////////////
// CREATING SCHEMAS
////////////////

//movies
var movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
    Death: String,
    Movies: [String]
  },
  ImagePath: String,
  Featured: Boolean,
  Actors: [String],
  ReleaseYear: String,
  IMDBRating: String
});

//users
var userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  EMail: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}]
});


////////////////
// CREATING MODELS
////////////////
var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

////////////////
// EXPORT
////////////////
module.exports.Movie = Movie;
module.exports.User = User;