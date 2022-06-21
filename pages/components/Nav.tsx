import styles from '../../styles/Nav.module.scss';
import { useState } from 'react';
import Link from 'next/link';
const Nav = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className={styles.yeahBoi}>
      <span className={styles.logo}>
        <Link href='/'>
          Panoptic
        </Link>
      </span>


      {/* if user is logged in, display their info
      else, display login button */}
      <div id={styles.navBtns}>
        <Link href='/docs'>
          <button className={styles.readDocsNav}>Documentation</button>
        </Link>
        <Link  href='/login'>
          <button className={styles.loginBtn}>Login / Signup</button>
        </Link>
      </div>
      {/* <div className={styles.buttonsContainer}>
        <Link href='/signup'>
          <button className={styles.signupBtn} >Sign Up</button>
        </Link>
      </div> */}
    </nav>
  );
};

export default Nav;
