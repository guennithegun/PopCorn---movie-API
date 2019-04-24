////////////////
// IMPORT RELEVANT MODULES
////////////////

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

////////////////
// CREATING SCHEMAS
////////////////

//movies
let movieSchema = mongoose.Schema({
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
let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  EMail: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}]
});

// hash and validate User password
userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

////////////////
// CREATING MODELS
////////////////
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

////////////////
// EXPORT
////////////////
module.exports.Movie = Movie;
module.exports.User = User;
