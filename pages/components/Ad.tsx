import styles from '../../styles/Home.module.scss';

const Ad = (props: any) => {
  return (
    <div className={styles.Ad}>
      <p>Ad</p>
      <div className={styles.adImgContainer}>
        <img className={styles.adImg} alt="ad sponsor" src="https://www.singlesprout.com/wp-content/themes/singlesprout/assets/img/landing/logos/singlesprout-logo-1.png" width="100%" height="auto" />
      </div>
      <p className={styles.adText}>Our technology empowers our recruiters to deliver a white-glove service for candidates, high-growth companies, and law firms.</p>
      <button className={styles.visitAd}>Visit Advertiser</button>
      <button className={styles.hideAd}>X</button>
    </div>
  )
}

export default Ad