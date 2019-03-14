////////////
// IMPORT NECESSARY MODULES
////////////

const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid'),
      mongoose = require('mongoose'),
      Models = require('./models.js');

// encapsulate express functionality
const app = express();

//assign the models
const Movies = Models.Movie;
const Users = Models.User;

///////////////
// CONNECT TO MONGODB
///////////////
mongoose.connect('mongodb://localhost:27017/popcornDB', {useNewUrlParser: true});

/////////////
// USE-FUNCTIONS SECTION
/////////////

// logging every reuquest with morgan to terminal
app.use(morgan('common'));

// serve documentation.html file from the public folder
app.use(express.static('public'));

// implementing body-parser for POST requests
app.use(bodyParser.json());

// error handling if something went wrong
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

/////////////
// MOVIE SECTION
/////////////

// returns json object of topMovies object to user
app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// returns JSON object of single movie by title
app.get('/movies/:title', (req, res) => {
  Movies.findOne({Title : req.params.title})
  .then((movie) => {
    res.status(201).json(movie)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// returns JSON Object containing every movie matching the genre
app.get('/movies/genres/:genre', (req, res) => {
  Movies.find({"Genre.Name": req.params.genre})
  .then((movies) => {
    res.status(201).json(movies)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// returns JSON Object containing every movie matching the dirrector
app.get('/movies/directors/:director', (req, res) => {
  Movies.find({"Director.Name": req.params.director})
  .then((movies) => {
    res.status(201).json(movies)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// returns JSON object with detailed director information by director name to user
app.get('/directors/:name', (req, res) => {
  Movies.findOne({"Director.Name" : req.params.name})
  .then((movie) => {
    res.status(201).json(movie.Director)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// returns JSON object with detailed genre information by genre name to user
app.get('/genres/:name', (req, res) => {
  Movies.findOne({"Genre.Name" : req.params.name})
  .then((movie) => {
    res.status(201).json(movie.Genre)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// adds a new movie to list
app.post('/movies', (req, res) => {
  Movies.findOne({ Title : req.body.Title})
  .then((movie) => {
    if (movie) {
      return res.status(400).send(req.body.Title + ' already exists');
    } else {
      Movies.create({
        Title: req.body.Title,
        Description: req.body.Description,
        Genre: req.body.Genre,
        Director: req.body.Director,
        ImagePath: req.body.ImagePath,
        Featured: req.body.Featured,
        Actors: req.body.Actors,
        ReleaseYear: req.body.ReleaseYear,
        IMDBRating: req.body.IMDBRating
      })
      .then((movie) => {
        res.status(201).json(movie)
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// deletes a movie from the topMovies list by name    // REWRITE TO ACCESS DB
app.delete('/movies/:title', (req, res) => {
  Movies.findOneAndRemove({ Title : req.params.title})
  .then((movie) => {
    if (!movie) {
      res.status(400).send(req.params.title + ' was not found')
    } else {
      res.status(200).send(req.params.title + ' was deleted')
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error)
  });
});

/////////////
// USERS SECTION
/////////////

// create new user
app.post('/users', (req, res) => {
  Users.findOne({ Username : req.body.Username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        EMail: req.body.EMail,
        Birthday: req.body.Birthday
      })
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// deletes user from users by ID
app.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({ Username : req.params.username})
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.username + ' was not found')
    } else {
      res.status(200).send(req.params.username + ' was deleted')
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error)
  });
});

// update the user info (username, password, email, date of birth) by username
app.put('/users/:username', (req, res) => {
  Users.update({ Username : req.params.username }, { $set: {
    Username : req.body.Username,
    Password : req.body.Password,
    EMail : req.body.EMail,
    Birthday : req.body.Birthday,
  }},
  { new : true },
  (error, updatedUser) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    } else {
      res.json(updatedUser)
    }
  })
});

// add a movie to users favoriteMovies list
app.put('/users/:username/movies/:movieid', (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.username}, { $push : {
    FavoriteMovies : req.params.movieid
  }},
  { new : true},
  (error, updatedUser) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    } else {
      res.json(updatedUser)
    }
  })
});

// default textual response when request hits the root folder
app.get('/', function(req, res) {
  res.send('Welcome to PopCorn. The best movie App ever :-P');
});

app.listen(8080);
