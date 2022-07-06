import styles from '../../styles/Home.module.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import React, { FC } from 'react';

const employeeID: FC<any> = (props: any): JSX.Element => {
  const githubIcon: JSX.Element = <FaGithub className={styles.githubIcon} />;
  const linkedinIcon: JSX.Element = (
    <FaLinkedin className={styles.linkedinIcon} />
  );
  return (
    <div>
      <div id={props.employeeID}></div>
      <h2>{props.employee}</h2>
      <div className={styles.linkContainer}>
        <a href={props.employeegit} target='_blank' rel='noreferrer'>
          {githubIcon}
        </a>
        <a href={props.employeelinkedin} target='_blank' rel='noreferrer'>
          {linkedinIcon}
        </a>
      </div>
    </div>
  );
};

export default employeeID;
