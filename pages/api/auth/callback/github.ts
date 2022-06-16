import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "../../../../lib/passport-github-auth";
const session = require('express-session');
import nextSession from "next-session";



export default nextConnect().use(session({
  secret: 'test'
})).get(
    passport.authenticate("github",{ failureRedirect: '/' }),
    (req: NextApiRequest & { user: any }, res: NextApiResponse) => {
      // you can save the user session here. to get access to authenticated user through req.user
      console.log('Here i am')
      res.redirect("/sample-test");
    }
);
