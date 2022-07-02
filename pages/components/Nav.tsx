import styles from '../../styles/Nav.module.scss';
import { useState, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../../assets/PanLogo.png';

const Nav:FC = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className={styles.yeahBoi}>
      <span className={styles.logo}>
        <Link href='/'>
          <Image className={styles.logoPic} alt="Panoptic Logo" src={logoPic}/>
        </Link>
      </span>
      <div id={styles.navBtns}>
        <Link href='/docs'>
          <button className={styles.readDocsNav}>Documentation</button>
        </Link>
        <Link  href='/login'>
          <button className={styles.loginBtn}>Login / Signup</button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
