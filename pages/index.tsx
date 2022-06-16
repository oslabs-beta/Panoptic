import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/hello`);
  const data = await res.json();

  return { props: { name: data.name } };
}

// Props interface with name set to string
interface Props {
  name: string;
}

//Creates Home Landing Page Component
//Using Link on the Button to Route to Sample
const Home: NextPage<Props> = (props): JSX.Element => {
  return (
    <div className={styles.container}>
      <Link href='/login'>
        <button>Enter</button>
      </Link>
    </div>
  );
};

export default Home;
