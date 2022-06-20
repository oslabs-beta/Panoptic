import { signIn, signOut, useSession, getSession } from 'next-auth/react';
// import styles from '../styles/Home.module.css';
import styles from '../styles/Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// Login page serving file
function LoginPage() {
  const githubIcon = <FaGithub className={styles.githubLogin}/>;
  const { data: session, status } = useSession();
//   const sesh = getSession();
//   console.log('SESH: ', sesh);
//   console.log(status);
  return (
    <div className={styles.body}>
      <form className={styles.loginForm} action='/api/login' method='post' id='login'>
        <input id='username' name='username' placeholder='username' className={styles.username}></input>
        <input
          id='password'
          name='password'
          placeholder='password'
          type='text'
          className={styles.password}
        ></input>
        <button type='submit' value='send' className={styles.loginButton}>
          Login
        </button>
        <a className={styles.oauthBtn}href="http://localhost:3000/api/githublogin">{githubIcon}Sign in with Github</a>
      </form>

      {/* <a href="api/auth/callback/github">Sign In With Github</a> */}
      {/* <button onClick={() => signIn("github")}> Sign in with Github</button> */}

 
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
  );
}

export default LoginPage;
