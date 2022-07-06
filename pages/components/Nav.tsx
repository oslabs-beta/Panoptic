import styles from '../../styles/Nav.module.scss';
import { useState, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../../assets/PanLogo.png';
import Auth from '../components/auth';
import { parseCookies } from '../../lib/parseCookies';

const Nav: FC = (props): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log('user id prop = ', props.userId);
  console.log('user id f/t = ', Auth(props.userId));
  const showLoginOrDash = async () => {
    const result = await Auth(props.userId.initialRememberValue);
    if (result === true) {
      setIsLoggedIn(true);
    }
  };
  showLoginOrDash();
  const LoggedInOrNot = () => {
    if (isLoggedIn) {
      return (
        <Link href='/dashboard'>
          <button id='dashboardBtn' className={styles.loginBtn}>
            Dashboard
          </button>
        </Link>
      );
    } else {
      return (
        <Link href='/login'>
          <button id='navLoginBtn' className={styles.loginBtn}>
            Login
          </button>
        </Link>
      );
    }
  };
  return (
    <nav className={styles.yeahBoi}>
      <span className={styles.logo}>
        <Link href='/'>
          <Image className={styles.logoPic} alt='Panoptic Logo' src={logoPic} />
        </Link>
      </span>
      <div id={styles.navBtns}>
        <Link href='/docs'>
          <button className={styles.readDocsNav}>Documentation</button>
        </Link>
        <LoggedInOrNot />
      </div>
    </nav>
  );
};

export default Nav;
