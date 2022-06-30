import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Sidenav.module.scss'
const Sidenav = (props: any):JSX.Element => {
  return (
    <nav className={styles.Sidenav}>
      <Link href="/"><h1 className={styles.logo}>Panoptic</h1></Link>
      <ul className={styles.linksContainer}>
        <li className={styles.listLink} ><Link className={styles.link} href="#">Home</Link></li>
        <li className={styles.listLink} ><Link className={styles.link} href="#">Details</Link></li>
        <li className={styles.listLink} ><Link className={styles.link} href="#">Information</Link></li>
        <li className={styles.listLink} ><Link className={styles.link} href="#">Settings</Link></li>
      </ul>
    </nav>
  )
}

export default Sidenav