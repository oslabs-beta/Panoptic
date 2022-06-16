// import Head from 'next/head';
import styles from '../../styles/Home.module.css';

import Link from 'next/link';
const Header = (): JSX.Element => {
  return (
    <header className={styles.container}>
      <Link className='titleThing' href='/'>
        Panoptic
      </Link>
      <hr />
    </header>
  );
};

export default Header;
