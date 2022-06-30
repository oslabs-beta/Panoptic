import Sidenav from "./components/Sidenav"
import styles from '../styles/Manager.module.scss';
const Manager = () => {
  return (
    <div className={styles.manager}>
      <Sidenav />
    </div>
  )
}

export default Manager