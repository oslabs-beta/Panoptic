import styles from '../../styles/Nav.module.scss';
import { useState, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../../assets/PanLogo.png';

const Nav: FC = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className={styles.yeahBoi}>
        <Link href='/'>
          <span className={styles.logo}>
              <Image className={styles.logoPic} alt='Panoptic Logo' src={logoPic} />
          </span>
        </Link>
      <div id={styles.navBtns}>
        <Link href='/docs'>
          <button className={styles.readDocsNav}>Documentation</button>
        </Link>
        <Link href='/login'>
          <button id='navLoginBtn' className={styles.loginBtn}>
            Login / Signup
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
