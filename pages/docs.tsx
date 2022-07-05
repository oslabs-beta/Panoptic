import type { NextPage } from 'next';
import Nav from './components/Nav';
import styles from '../styles/Docs.module.scss';
import { useState } from 'react';
import React from 'react';

const Docs: NextPage = (): JSX.Element => {
  const [activeBtn, setActiveBtn] = useState(0);
  let buttons:JSX.Element = (
    <div id={styles.docsNav}>
      <div>
        <ul id={styles.docsList}>
          <li className={styles.docsListItem}>
            <button
              disabled
              id='listButton1'
              className={styles.listButton}
              onClick={():void => setActiveBtn(0)}
            >
              Using our Application
            </button>
          </li>
          <li className={styles.docsListItem}>
            <button
              id='listButton2'
              className={styles.listButton}
              onClick={():void => setActiveBtn(1)}
            >
              About Google Lighthouse
            </button>
          </li>
          <li className={styles.docsListItem}>
            <button
              id='listButton3'
              className={styles.listButton}
              onClick={():void => setActiveBtn(2)}
            >
              Using the Metrics
            </button>
          </li>
        </ul>
      </div>
      <div id={styles.rightside}>
        <UsingApp />
      </div>
    </div>
  );
  if (activeBtn === 0) {
    buttons = (
      <div id={styles.docsNav}>
        <div>
          <ul id={styles.docsList}>
            <li className={styles.docsListItem}>
              <button
                disabled
                id='listButton1'
                className={styles.listButton}
                onClick={():void => setActiveBtn(0)}
              >
                Using our Application
              </button>
            </li>
            <li className={styles.docsListItem}>
              <button
                id='listButton2'
                className={styles.listButton}
                onClick={():void => setActiveBtn(1)}
              >
                About Google Lighthouse
              </button>
            </li>
            <li className={styles.docsListItem}>
              <button
                id='listButton3'
                className={styles.listButton}
                onClick={():void => setActiveBtn(2)}
              >
                Using the Metrics
              </button>
            </li>
          </ul>
        </div>
        <div id={styles.rightside}>
          <UsingApp />
        </div>
      </div>
    );
  };
  if (activeBtn === 1) {
    buttons = (
      <div id={styles.docsNav}>
        <div>
          <ul id={styles.docsList}>
            <li className={styles.docsListItem}>
              <button
                id='listButton1'
                className={styles.listButton}
                onClick={():void => setActiveBtn(0)}
              >
                Using our Application
              </button>
            </li>
            <li className={styles.docsListItem}>
              <button
                disabled
                id='listButton2'
                className={styles.listButton}
                onClick={():void => setActiveBtn(1)}
              >
                About Google Lighthouse
              </button>
            </li>
            <li className={styles.docsListItem}>
              <button
                id='listButton3'
                className={styles.listButton}
                onClick={():void => setActiveBtn(2)}
              >
                Using the Metrics
              </button>
            </li>
          </ul>
        </div>
        <div id={styles.rightside}>
          <AboutLH />
        </div>
      </div>
    );
  };
  if (activeBtn === 2) {
    buttons = (
      <div id={styles.docsNav}>
        <div>
          <ul id={styles.docsList}>
            <li className={styles.docsListItem}>
              <button
                id='listButton1'
                className={styles.listButton}
                onClick={():void => setActiveBtn(0)}
              >
                Using our Application
              </button>
            </li>
            <li className={styles.docsListItem}>
              <button
                id='listButton2'
                className={styles.listButton}
                onClick={():void => setActiveBtn(1)}
              >
                About Google Lighthouse
              </button>
            </li>
            <li className={styles.docsListItem}>
              <button
                disabled
                id='listButton3'
                className={styles.listButton}
                onClick={():void => setActiveBtn(2)}
              >
                Using the Metrics
              </button>
            </li>
          </ul>
        </div>
        <div id={styles.rightside}>
          <UsingMetrics />
        </div>
      </div>
    );
  };
  return (
    <div id={styles.docsPage}>
      <Nav />
      {buttons}
    </div>
  );
};

export default Docs;
