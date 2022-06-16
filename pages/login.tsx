import { signIn, signOut, useSession, getSession } from 'next-auth/react';
import styles from '../styles/Home.module.css';

// Login page serving file
function LoginPage() {
  const { data: session, status } = useSession();
//   const sesh = getSession();
//   console.log('SESH: ', sesh);
//   console.log(status);
  return (
    <div className={styles.container}>
      <div>Login</div>
      <form action='/api/login' method='post' id='login'>
        <input id='username' name='username' placeholder='username'></input>
        <input
          id='password'
          name='password'
          placeholder='password'
          type='text'
        ></input>
        <button type='submit' value='send'>
          Login
        </button>
      </form>

      {/* <a href="api/auth/callback/github">Sign In With Github</a> */}
      {/* <button onClick={() => signIn("github")}> Sign in with Github</button> */}

      <div>
        <h1>Github OAuth Demo</h1>
        <h1>Test</h1>
        <a href="http://localhost:3000/api/githublogin">Test Me</a>
        {/* {!session ? (
          <>
            <button
              onClick={() =>
                signIn('github', {
                //   callbackUrl: 'http://localhost:3000/sample-test',
                })
              }
            >
              Sign in with Github
            </button>
          </>
        ) : (
          <>
            <p>
              {console.log(session)}
              Logged in as: {session.user.name || session.user.email}
            </p>
            <img
              src={session.user.image}
              alt='avi'
              width='100px'
              height='100px'
            />
            <button onClick={signOut}>Logout</button> <br />
          </>
        )} */}
      </div>
    </div>
  );
}

export default LoginPage;
