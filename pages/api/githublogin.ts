import nextConnect from "next-connect";
import passport from "../../lib/passport-github-auth";


export default nextConnect()
  .use(passport.initialize())
  .get(
    passport.authenticate('github', { scope: ['read:user', 'repo:status', 'workflow'] })
  );