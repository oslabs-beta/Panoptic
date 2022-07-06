import { Strategy } from 'passport-github2';
import passport from 'passport';

passport.use(
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: '/api/auth/callback/github',
    },

    function (accessToken, refreshToken, profile, cb) {
      profile.token = accessToken;
      profile.refresh = refreshToken;
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((id, cb) => {
  cb(null, id);
});

export default passport;
