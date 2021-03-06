////////////////
// IMPORT RELEVANT MODULES / FILES
////////////////

let jwtSecret = 'your_jwt_secret';
let jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

////////////////
// FUNCTION TO GENRATE JWT TOKEN
////////////////
function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
}

////////////////
// MODULE EXPORT PASSPORT MIDDLEWARE
////////////////
module.exports = (app) => {
  app.post('/login', (req, res) => {
    passport.authenticate('local', { session : false}, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
