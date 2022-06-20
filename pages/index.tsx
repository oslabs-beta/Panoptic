import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

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
    <div className={styles.home}>
      <div className={styles.hero}>

        <div className={styles.left}>
          <h1 className={styles.leftTitle}>Track your performance metrics per commit</h1>
          <p className={styles.subText}>Refer to the docs for more information</p>

          <div className={styles.heroBtnContainer}>
            <button className={styles.readDocs}>Read Docs</button>
            <button className={styles.install}>Install</button>
          </div>

        </div>
        <div className={styles.right}>
          
        </div>
      </div>
      <div>
        <h3 className={styles.mdeak}>M.D.E.A.K</h3>
        <div className={styles.staffcontainer}>
          <div>Marc</div>
          <div>Davis</div>
          <div>Elliot</div>
          <div>Austin</div>
          <div>Karl</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
