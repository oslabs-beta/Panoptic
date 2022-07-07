import styles from '../../styles/Nav.module.scss';
import { useState, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../../assets/PanLogo.png';
import { useSession, signIn, signOut } from 'next-auth/react';

const Nav: FC = (props): JSX.Element => {
  const { data: session } = useSession();

  const SignedInAs = () => {
    if (session) {
      return (
        <div className='signedInAs'> Signed in as {session.user.email}</div>
      );
    } else {
      return <></>;
    }
  };
  const LoggedInOrNot = () => {
    if (session) {
      return (
        <>
          <Link href='/dashboard'>
            <button id='dashboardBtn' className={styles.readDocsNav}>
              Dashboard
            </button>
          </Link>
          <button
            id='signOutBtn'
            className={styles.loginBtn}
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      );
    } else {
      return (
        <button
          id='navLoginBtn'
          className={styles.loginBtn}
          onClick={() => signIn()}
        >
          Sign in
        </button>
      );
    }
  };
  return (
    <>
      {' '}
      <nav className={styles.yeahBoi}>
        <span className={styles.logo}>
          <Link href='/'>
            <Image
              className={styles.logoPic}
              alt='Panoptic Logo'
              src={logoPic}
            />
          </Link>
        </span>
        <SignedInAs />
        <div id={styles.navBtns}>
          <Link href='/docs'>
            <button className={styles.readDocsNav}>Documentation</button>
          </Link>
          <LoggedInOrNot />
        </div>
      </nav>
    </>
  );
};

export default Nav;
