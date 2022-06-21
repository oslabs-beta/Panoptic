import React from 'react';
import styles from '../../styles/Home.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const employeeID = (props: any): JSX.Element => {
  const githubIcon = <FaGithub className={styles.githubIcon}/>;
  const linkedinIcon = <FaLinkedin className={styles.linkedinIcon} />;
  return (
        <div>
          <div id={props.employeeID}></div>
          <h2>{props.employee}</h2>
          <div className={styles.linkContainer}>
            <a href={props.employeegit} target="_blank" rel="noreferrer">{githubIcon}</a>
            <a href={props.employeelinkedin} target="_blank" rel="noreferrer">{linkedinIcon}</a>
          </div>
        </div>
  )
}

export default employeeID