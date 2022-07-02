import styles from '../../styles/Home.module.scss';
import { useState } from 'react';
<<<<<<< HEAD

const Ad = (props: any) => {
  // state to hide ad
=======
import React, { FC } from 'react';

const Ad:FC = (props: any) => {
>>>>>>> dbchanges
  const [showMe, setShowMe] = useState(true);
  // function to hide ad, toggles state
  const hideAd = () => {
    showMe ? setShowMe(false) : setShowMe(true);
  };
  return (
    // styling dependent on showMe state
    <div style={{ display: showMe ? 'flex' : 'none' }} className={styles.Ad}>
      <p>Ad</p>
      <div className={styles.adImgContainer}>
        <img
          className={styles.adImg}
          alt='ad sponsor'
          src='https://www.singlesprout.com/wp-content/themes/singlesprout/assets/img/landing/logos/singlesprout-logo-1.png'
          width='100%'
          height='auto'
        />
      </div>
      <p className={styles.adText}>
        Our technology empowers our recruiters to deliver a white-glove service
        for candidates, high-growth companies, and law firms.
      </p>
      <a href='https://www.singlesprout.com/' className={styles.visitAd}>
        Visit Advertiser
      </a>
      <button onClick={hideAd} className={styles.hideAd}>
        X
      </button>
    </div>
  );
};

export default Ad;
