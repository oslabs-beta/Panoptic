import styles from '../../styles/Home.module.scss';
import Link from 'next/link';

const Hero = (): JSX.Element => {
return (
    <div className={styles.hero}>

      <div className={styles.left}>
        <h1 className={styles.leftTitle}>Track Your Web Performance<span className={styles.panopticWord}> Metrics</span> Per Commit</h1>
        <p className={styles.subText}>Refer to the docs for more information</p>

        <div className={styles.heroBtnContainer}>
          <Link href='/docs'>
            <button className={styles.readDocs}>Read Docs</button>
          </Link>
          <button className={styles.install}>Demo</button>
        </div>

      </div>
      <div className={styles.right}>
      </div>
    </div>
  );
};

export default Hero;
