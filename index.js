////////////
// IMPORT NECESSARY MODULES
////////////

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const uuid = require('uuid');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const validator = require('express-validator');
const Models = require('./models.js');

require('./passport');

// encapsulate express functionality
const app = express();

//assign the models
const Movies = Models.Movie;
const Users = Models.User;

///////////////
// CONNECT TO MONGODB
///////////////

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

/////////////
// USE-FUNCTIONS SECTION
/////////////

// logging every reuquest with morgan to terminal
app.use(morgan('common'));

// serve documentation.html file from the public folder
app.use(express.static('public'));

// implementing body-parser for POST requests
app.use(bodyParser.json());

// use CORS
app.use(cors());

// import auth.js file
let auth = require('./auth')(app);

// use express-validator
app.use(validator());

// error handling if something went wrong
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

/////////////
// MOVIE SECTION
/////////////

/**
* returns json object of topMovies object to user
* endpoint URL: /movies
* GET request
* no required params
* example request:
*@function getMovies(token) {
*    axios.get('https://popcorn-movieapp.herokuapp.com/movies', {
*      headers: { Authorization: `Bearer ${token}` }
*    })
*    .then(response => {
*      this.props.setMovies(response.data);
*      localStorage.setItem('movies', JSON.stringify(response.data));
*    })
*    .catch(function(error) {
*      console.log(error);
*    });
*   }
* example response:
* @param {string} _id
* @param {string} title
* @param {string} description
* @param {object} director
* @param {object} genre
* @param {string} ImagePath
* @param {string} Featured
* @param {object} Actors
* @param {string} IMDBRating
* @param {string} ReleaseYear
*/
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/movies/genres/:genre', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/movies/directors/:director', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/genres/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.post('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  // server-side Input validation
  req.checkBody('Title', 'Title is required').notEmpty();
  req.checkBody('Description', 'Description is required').notEmpty();

  // check the validation object for errors
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors });
  }

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

/**
* deletes a movie from the topMovies list by name
* endpoint URL: /movies/:title
* DELETE request
* @params {string} title
* example request:
* @function deleteMovie(event, favoriteMovie) {
*  event.preventDefault();
*  console.log(favoriteMovie);
*  axios.delete(`https://popcorn-movieapp.herokuapp.com/users/${localStorage.getItem('user')}/movies/${favoriteMovie}`, {
*    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
*  })
*  .then(response => {
*    // update state with current movie data
*    this.getUser(localStorage.getItem('token'));
*  })
*  .catch(event => {
*    alert('Oops... something went wrong...');
*  });
* }
* example response:
* A text message indicating whether the movie was successfully removed.
*/
app.delete('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
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

/**
* create new user
* endpoint URL: /users
* POST request
* params required:
* @params {string} username
* @params {string} password
* @params {string} email
* example request:
* @function handleSubmit = (event) => {
*  event.preventDefault();
*  axios.post('https://popcorn-movieapp.herokuapp.com/users', {
*      Username: username,
*      Password: password,
*      EMail: email,
*      Birthday: birthday,
*  })
*  .then(response => {
*    const data = response.data;
*    console.log(data);
*    window.open('/', '_self');
*  })
*  .catch(e => {
*    console.log('error registering the user')
*  });
* }
* example response:
* @param {object} user
* @params {string} _id
* @params {string} Username
* @params {string} Password
* @params {string} EMail
* @params {date} Birthday
*/
app.post('/users', (req, res) => {
  // server-side Input validation
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('EMail', 'EMail is required').notEmpty();
  req.checkBody('EMail', 'EMail does not appear to be valid').isEmail();

  // check the validation object for errors
  let errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors });
  }

  // hash password of new User
  let hashedPassword = Users.hashPassword(req.body.Password);

  // create new User
  Users.findOne({ Username : req.body.Username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
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

// get specific user
app.get('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username : req.params.username })
  .then((user) => {
    res.status(201).json(user)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// deletes user from users by ID
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
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
/**
* update the user info (username, password, email, date of birth) by username
* endpoint URL: /users/:username
* PUT request
* @params {string} Username
* @params {string} Password
* @params {string} EMail
* @params {date} Birthday
* example request:
* @function handleSubmit(event) {
*  event.preventDefault();
*  console.log(this.state.username);
*  axios.put(`https://popcorn-movieapp.herokuapp.com/users/${localStorage.getItem('user')}`, {
*    Username: this.state.usernameForm,
*    Password: this.state.passwordForm,
*    EMail: this.state.emailForm,
*    Birthday: this.state.birthdayForm
*  }, {
*    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
*  })
*  .then(response => {
*    console.log(response);
*    alert('Your data has been updated!');
*    //update localStorage
*    localStorage.setItem('user', this.state.usernameForm);
*    // call getUser() to dusplay changed userdata after submission
*    this.getUser(localStorage.getItem('token'));
*    // reset form after submitting data
*    document.getElementsByClassName('changeDataForm')[0].reset();
*  })
*  .catch(event => {
*    console.log('error updating the userdata');
*    alert('Ooooops... Something went wrong!');
*  });
* };
* example response:
* @param {object} JSON object
* @params {string} n
* @params {string} nModified
* @params {string} ok
*/
app.put('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  // server-side Input validation
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('EMail', 'EMail is required').notEmpty();
  req.checkBody('EMail', 'EMail does not appear to be valid').isEmail();

  // check the validation object for errors
  let errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors });
  }

  // hash password of new User
  let hashedPassword = Users.hashPassword(req.body.Password);

  // update User Data
  Users.update({ Username : req.params.username }, { $set: {
    Username : req.body.Username,
    Password : hashedPassword,
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
app.put('/users/:username/movies/:movieid', passport.authenticate('jwt', { session: false }), (req, res) => {
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

// delete a movie from users favoriteMovies list
app.delete('/users/:username/movies/:movieid', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.username}, { $pull : {
    FavoriteMovies : req.params.movieid
  }},
  (error, updatedUser) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    } else {
      res.json(updatedUser)
    }
  })
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// // default textual response when request hits the root folder
// app.get('/', function(req, res) {
//   res.send('Welcome to PopCorn. The best movie App ever :-P');
// });

/////////////
// APP Listener
/////////////
let port = process.env.PORT || 8080;

app.listen(port, '0.0.0.0', function() {
  console.log(`Listening on ${port}`);
});
