import GithubProvider from 'next-auth/providers/github';
import NextAuth from 'next-auth';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: "https://github.com/login/oauth/authorize?scope=read:user+user:email+repo+read:repo_hook+workflow",
    })
  ],
})



