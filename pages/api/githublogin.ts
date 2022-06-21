import nextConnect from "next-connect";
import passport from "../../lib/passport-github-auth";


export default nextConnect()
  .use(passport.initialize())
  .get(
    // passport.authenticate("google", {
    //   scope: ["profile", "email"],})
    passport.authenticate('github', { scope: ['read:user', 'read:repo', 'workflow', 'repo:read'] })
  );