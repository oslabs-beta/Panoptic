import { signIn, signOut, useSession, getSession } from 'next-auth/react';
// import styles from '../styles/Home.module.css';
import styles from '../styles/Login.module.scss';
import Nav from './components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Box } from '@chakra-ui/react';

// Sign Up page serving file
function signupPage():JSX.Element {
  const githubIcon = <FaGithub className={styles.githubLogin} />;


  return (
    <div className={styles.body}>
      <Nav />
      <form
        className={styles.loginForm}
        action='/api/login'
        method='post'
        id='login'
      >
        <Box
          mb='2'
          fontWeight='semibold'
          as='h2'
          color='black.200'
          lineHeight='tight'
          // noOfLines={1}
          textAlign='center'
        >
          Create A New Account
        </Box>
        <Box w='100%'>
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
          <input
            id='re_password'
            name='re_password'
            placeholder='Re-Type password'
            type='text'
            className={styles.password}
          ></input>
          <button type='submit' value='send' className={styles.loginButton}>
            Login
          </button>
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            color='black'
            lineHeight='tight'
            // noOfLines={1}
            textAlign='center'
            m={5}
          >
            Or
          </Box>
          <a
            className={styles.oauthBtn}
            href='http://localhost:3000/api/githublogin'
          >
            {githubIcon}Create Account Using Github
          </a>
        </Box>
      </form>
    </div>
  );
};

export default signupPage;
