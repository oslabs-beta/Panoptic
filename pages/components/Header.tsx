// import Head from 'next/head';
import Link from 'next/link';
const Header = (): JSX.Element => {
  return (
    <header className=''>
      <Link className='titleThing' href='/'>
        Panoptic
      </Link>
      <hr />
    </header>
  );
};

export default Header;
