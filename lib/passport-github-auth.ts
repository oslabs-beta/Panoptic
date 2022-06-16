import { Strategy } from 'passport-github2'
import passport from 'passport'



passport.use(new Strategy(
    {
    clientID: process.env.GITHUB_CLIENT,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/callback/github'
    },
  
    function (accessToken, refreshToken, profile, cb) {
    console.log('test')
    console.log(accessToken, profile, refreshToken);
    return cb(null, profile);
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((id: any, cb) => {
    cb(null, id);
  });


export default passport;
