import { signIn, signOut, useSession, getSession } from 'next-auth/react';
// import styles from '../styles/Home.module.css';
import styles from '../styles/Login.module.scss';
import Nav from './components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Auth from './components/auth';
import { parseCookies } from '../lib/parseCookies';
import { useRouter } from 'next/router';

// Login page serving file
function LoginPage({ initialRememberValue }): JSX.Element {
  const router = useRouter();
  const githubIcon: JSX.Element = <FaGithub className={styles.githubLogin} />;
  const { data: session, status } = useSession();
  const userValid = Auth(initialRememberValue);
  if (!initialRememberValue || !userValid) {
    // no cookie found for login
    return (
      <div className={styles.body}>
        <Nav />
        <form
          className={styles.loginForm}
          action='/api/login'
          method='post'
          id='login'
        >
          <input
            id='username'
            name='username'
            placeholder='username'
            className={styles.username}
          ></input>
          <input
            id='password'
            name='password'
            placeholder='password'
            type='text'
            className={styles.password}
          ></input>
          <button
            id='loginBtn'
            type='submit'
            value='send'
            className={styles.loginButton}
          >
            Login
          </button>
          <a
            onClick={() => signIn('github')}
            className={styles.oauthBtn}
            href='http://localhost:3000/api/githublogin'
          >
            {githubIcon}Sign in with Github
          </a>
        </form>
      </div>
    );
  } else {
    try {
      router.push('/dashboard');
    } catch (err) {}
  }
}
LoginPage.getInitialProps = async ({ req }) => {
  // Parseing cookie with our own function so we can read it
  const cookies = parseCookies(req);
  // Return our cookie and grab name from cookie
  return {
    initialRememberValue: cookies.userId,
  };
};

export default LoginPage;
