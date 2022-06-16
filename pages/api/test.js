require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session')
const passport = require('passport');
const { Strategy } = require('passport-github').Strategy;

app.use(express.json());
app.use(cors());

app.use(session({
  secret: 'test',
}));

app.use(passport.initialize());

passport.serializeUser((user, cb) => {
  cb(null, user);
})
passport.deserializeUser((id, cb) => {
  cb(err, user);
})

passport.use(new Strategy(
  {
  clientID: "26a39c74c6cc84f5a4ab",
  clientSecret: "34bf7cb06ce444f2f964633472c538eddef13e26",
  callbackURL: 'http://localhost:3000/api/auth/callback/github'
  },

  function (accessToken, refreshToken, profile, cb) {
  console.log('test')
  console.log(accessToken, profile, refreshToken);
  return cb(null, profile);
}));

app.get('/api/auth', passport.authenticate('github', {scope: ['read:user', 'read:repo']}));

app.get('/api/auth/callback/github', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  console.log('here')
  res.redirect('/');
})
// app.get('/api/auth', (req, res) => {
//   const { redirectTo } = req.query;
//   const state = JSON.stringify({ redirectTo });
//   const authenticator = passport.authenticate('github', {scope: ['read:user', 'read:repo'], state, session: true});
//   authenticator(req, res, next);
// }, (req, res, next) => {
//   next();
// });

// app.get('/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }), (req, res, next) => {
//     const token = jwt.sign({id: req.user.id}, JWT_KEY, {expiresIn: 60 * 60 * 24 * 1000})
//     req.logIn(req.user, function(err) {
//       if (err) return next(err); ;
//       res.redirect(`http://localhost:3000?token=${token}`)
//     });
//   },
// );

app.listen(3000, () => {
  console.log('listening on port 3000');
});