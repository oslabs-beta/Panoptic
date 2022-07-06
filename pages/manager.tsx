import Sidenav from "./components/Sidenav"
import styles from '../styles/Manager.module.scss';
import { NextPage } from 'next';

const Manager:NextPage = ():JSX.Element => {
  return (
    <div className={styles.manager}>
      <Sidenav />
    </div>
  )
}

export default Manager;