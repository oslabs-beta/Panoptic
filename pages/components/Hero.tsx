import styles from '../../styles/Home.module.scss';

const Hero = (): JSX.Element => {
return (
    <div className={styles.hero}>

      <div className={styles.left}>
        <h1 className={styles.leftTitle}>Track your performance metrics per commit</h1>
        <p className={styles.subText}>Refer to the docs for more information</p>

        <div className={styles.heroBtnContainer}>
          <button className={styles.readDocs}>Read Docs</button>
          <button className={styles.install}>Demo</button>
        </div>

      </div>
      <div className={styles.right}>
        
      </div>
    </div>
  );
};

export default Hero;
