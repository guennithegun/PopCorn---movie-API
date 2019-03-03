////////////
// import necessary modules
////////////

const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid');

// encapsulate express functionality
const app = express();

///////////////
// In Memory test arrays
///////////////

// object with top 10 movies
let topMovies = [ {
  id : '1',
  title : 'Snatch',
  description : 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
  genre : ['comedy', 'crime'],
  director : 'Guy Ritchie',
  imageURL : 'https://www.imdb.com/title/tt0208092/mediaviewer/rm1248859904'
},
{
  id : '2',
  title : 'Lock, Stock & Two Smoking Barrels',
  description : 'A botched card game in London triggers four friends, thugs, weed-growers, hard gangsters, loan sharks and debt collectors to collide with each other in a series of unexpected events, all for the sake of weed, cash and two antique shotguns.',
  genre : ['comedy', 'crime'],
  director : 'Guy Ritchie',
  imageURL : 'https://www.imdb.com/title/tt0120735/mediaviewer/rm1138956032'
},
{
  id : '3',
  title : 'MAD MAX: Fury Road',
  description : 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
  genre : ['action', 'adventure', 'sci-fi', 'thriller'],
  director : 'George Miller',
  imageURL : 'https://www.imdb.com/title/tt1392190/mediaviewer/rm3064749568'
},
{
  id : '4',
  title : 'STAR WARS: The Last Jedi',
  description : 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.',
  genre : ['action', 'adventure', 'sci-fi', 'fantasy'],
  director : 'Rian Johnson',
  imageURL : 'https://www.imdb.com/title/tt2527336/mediaviewer/rm574104832'
},
{
  id : '5',
  title : 'The Dark Knight',
  description : 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  genre : ['action', 'crime', 'thriller', 'drama'],
  director : 'Christopher Nolan',
  imageURL : 'https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632'
},
{
  id : '6',
  title : 'Captain America: Civil War',
  description : 'Political involvement in the Avengers affairs causes a rift between Captain America and Iron Man.',
  genre : ['action', 'adventure', 'sci-fi'],
  director : 'Anthony Russo',
  imageURL : 'https://www.imdb.com/title/tt3498820/mediaviewer/rm3218348288'
},
{
  id : '7',
  title : 'The Terminator',
  description : 'A seemingly indestructible android is sent from 2029 to 1984 to assassinate a waitress, whose unborn son will lead humanity in a war against the machines, while a soldier from that war is sent to protect her at all costs.',
  genre : ['action', 'sci-fi'],
  director : 'James Cameron',
  imageURL : 'https://www.imdb.com/title/tt0088247/mediaviewer/rm774208512'
},
{
  id : '8',
  title : 'Casino Royale',
  description : 'Armed with a license to kill, Secret Agent James Bond sets out on his first mission as 007, and must defeat a private banker to terrorists in a high stakes game of poker at Casino Royale, Montenegro, but things are not what they seem.',
  genre : ['action', 'adventure', 'thriller'],
  director : 'Martin Campbell',
  imageURL : 'https://www.imdb.com/title/tt0381061/mediaviewer/rm3667992064'
},
{
  id : '9',
  title : 'The Lord of the Rings: The Two Towers',
  description : 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Saurons new ally, Saruman, and his hordes of Isengard.',
  genre: ['drama', 'adventure', 'fantasy'],
  director : 'Peter Jackson',
  imageURL : 'https://www.imdb.com/title/tt0167261/mediaviewer/rm2020826368'
},
{
  id : '10',
  title : 'Black Panther',
  description : 'TChalla, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his countrys past.',
  genre : ['action', 'adventure', 'sci-fi'],
  director : 'Ryan Coogler',
  imageURL : 'https://www.imdb.com/title/tt1825683/mediaviewer/rm172972800'
}
]

// directors list
let directors = [{
  id : '1',
  name : 'Peter Jackson',
  bio : 'https://www.imdb.com/name/nm0001392/bio?ref_=nm_ov_bio_sm',
  born : 1961,
  died : 'n/a'
},
{
  id : '2',
  name : 'Ryan Coogler',
  bio : 'https://www.imdb.com/name/nm3363032/bio?ref_=nm_ov_bio_sm',
  born : 1986,
  died : 'n/a'
},
{
  id : '3',
  name : 'Martin Campbell',
  bio : 'https://www.imdb.com/name/nm0132709/bio?ref_=nm_ov_bio_sm',
  born : 1943,
  died : 'n/a'
},
{
  id : '4',
  name : 'James Cameron',
  bio : 'https://www.imdb.com/name/nm0000116/bio?ref_=nm_ov_bio_sm',
  born : 1954,
  died : 'n/a'
},
{
  id : '5',
  name : 'Anthony Russo',
  bio : 'https://www.imdb.com/name/nm0751577/bio?ref_=nm_ov_bio_sm',
  born : 1970,
  died : 'n/a'
},
{
  id : '6',
  name : 'Christopher Nolan',
  bio : 'https://www.imdb.com/name/nm0634240/bio?ref_=nm_ov_bio_sm',
  born : 1970,
  died : 'n/a'
},
{
  id : '7',
  name : 'Rian Johnson',
  bio : 'https://www.imdb.com/name/nm0426059/bio?ref_=nm_ov_bio_sm',
  born : 1973,
  died : 'n/a'
},
{
  id : '8',
  name : 'George Miller',
  bio : 'https://www.imdb.com/name/nm0004306/bio?ref_=nm_ov_bio_sm',
  born : 1945,
  died : 'n/a'
},
{
  id : '9',
  name : 'Guy Ritchie',
  bio : 'https://www.imdb.com/name/nm0005363/bio?ref_=nm_ov_bio_sm',
  born : 1968,
  died : 'n/a'
}

];

// users list
let users = [{
  id : '1',
  username : 'Peter Polanski',
  password : 'XXXXXX',
  email : 'polanski@example.com',
  dateOfBirth : 1985
}
];

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
app.get('/user/movies', function(req, res) {
  res.json(topMovies);
});

// returns JSON object of single movie by title to user
app.get('/user/movies/:title/:genre', (req, res) => {
  console.log( require('util').inspect( req.params) );
  let title = topMovies.find((movie) => {
    return movie.title === req.params.title
  });
  let genre = topMovies.filter(function(obj) {
    return obj.genre.includes(req.params.genre)
  });

  if (title) {
    res.json(title);
  } else if (genre) {
    res.json(genre);
  } else {
    res.status(404).send('No film matching your request was not found.')
  }
});

/*app.get("/user/movies/:title/:genre/:director", (req, res) => {
 res.send('Successful GET request returning data of single movie/ list of movies by genre / details on director');
});*/

// returns JSON object about director by name to user
app.get('/directors/:name', function(req, res) {
  res.json(directors.find((director) => {
    return director.name === req.params.name
  }));
});

// adds a new movie to list
app.post('/user/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing title in request body';
      res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    topMovies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

// deletes a movie from the topMovies list by name
app.delete('/user/movies/:id', (req, res) => {
  let movie = topMovies.find((obj) =>
    { return obj.id === req.params.id });

  if (movie) {
    topMovies.filter(function(obj) {return obj.id !== req.params.id});
    res.status(201).send('Movie ' + req.params.id + ' was deleted.')
  }
});

/////////////
// USERS SECTION
/////////////

// create new user
app.post('/user', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing username in request body';
      res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// deletes user from users by ID
app.delete('/user/:id', (req, res) => {
  let user = users.find((obj) =>
    { return obj.id === req.params.id });

  if (user) {
    users.filter(function(obj) {return obj.id !== req.params.id});
    res.status(201).send('User ' + req.params.id + ' was deleted.')
  }
});

// update the user info (username, password, email, date of birth) by ID (is the only unchangable identification)
app.put('/user/:id/:username/:password/:email/:dateOfBirth', (req, res) => {
  let user = users.find( (user) => {
    return user.id === req.params.id
  });

  if (user) {
    user.username = req.params.username;
    user.password = req.params.password;
    user.email = req.params.email;
    user.dateOfBirth = req.params.dateOfBirth;
    res.status(201).send('User information(s) successfully changed');
  } else {
    res.status(404).send("User with the ID " + req.params.id  + " was not found.");
  }
});

// default textual response when request hits the root folder
app.get('/', function(req, res) {
  res.send('Welcome to PopCorn. The best movie App ever :-P');
});

app.listen(8080);
