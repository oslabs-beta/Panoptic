// import styles from '../styles/Home.module.css';
import styles from '../styles/Login.module.scss';
import Nav from './components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// Login page serving file
function LoginPage(): JSX.Element {
  const githubIcon: JSX.Element = <FaGithub className={styles.githubLogin} />;
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
          Login/Sign Up
        </button>
        <p className={styles.construction}>
          GitHub Sign in Coming Soon !!
        </p>
        <a
          // onClick={() => signIn('github')}
          className={styles.oauthBtn}
          // href='/api/githublogin'
        >
          {githubIcon}Sign in with Github
        </a>
      </form>
    </div>
  );
}

export default LoginPage;
