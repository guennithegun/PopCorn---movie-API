// import express.js and morgan
const express = require('express');
const morgan = require('morgan');

// encapsulate express functionality
const app = express();

// top 10 movies
let topMovies = [ {
    title : 'Snatch',
    regisseur : 'Guy Ritchie'
},
{
    title : 'Lock, Stock & Two Smoking Barrels',
    regisseur : 'Guy Ritchie'
},
{
    title : 'MAD MAX: Fury Road',
    regisseur : 'George Miller'
},
{
    title : 'STAR WARS: The Last Jedi',
    regisseur : ' Rian Johnson'
},
{
    title : 'The Dark Knight',
    regisseur : 'Christopher Nolan'
},
{
    title : 'Captain America: Civil War',
    regisseur : 'Joe Russo, Anthony Russo'
},
{
    title : 'The Terminator',
    regisseur : 'James Cameron'
},
{
    title : 'Casino Royale',
    regisseur : 'Martin Campbell'
},
{
    title : 'The Lord of the Rings: The Two Towers',
    regisseur : 'Peter Jackson'
},
{
    title : 'Black Panther',
    regisseur : 'Ryan Coogler'
}
]

// logging with morgan
app.use(morgan('common'));
// serve documentation.html file from the public folder
app.use(express.static('public'));
// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// return movie data
app.get('/movies', function(req, res) {
    res.json(topMovies)
});
// default textual response
app.get('/', function(req, res) {
  res.send('Welcome to PopCorn. The best movie App ever :-P');
});

app.listen(8080);
