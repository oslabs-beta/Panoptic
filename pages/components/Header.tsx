// import Head from 'next/head';
import stylesHome from '../../styles/Home.module.css';
import stylesNav from '../../styles/Nav.module.css';

import Link from 'next/link';
const Header = (): JSX.Element => {
  return (
    <header className={`${stylesHome.container} ${stylesNav.yeah3}`}>
      <Link className='' href='/'>
        Panoptic
      </Link>
      <hr />
    </header>
  );
};

export default Header;
