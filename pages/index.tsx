import type { NextPage } from 'next';
import Nav from './components/Nav';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Hero from './components/Hero';
import EmployeeID from './components/employeeID';
import Ad from './components/Ad';
import Head from 'next/head';

const Home:NextPage = ():JSX.Element => {
  return (
    <div id='homePage'>
      <Nav />
      <div className={styles.home}>
        <Hero />
        <Ad />
        <div className={styles.lowcontainer}>
          <h3 className={styles.mdeak}>Meet Our Team</h3>
          <div className={styles.staffcontainer}>
            <EmployeeID
              employeeID={styles.marcpic}
              employee='Marc Doran'
              employeegit='https://github.com/CodedMarc'
              employeelinkedin='https://www.linkedin.com/in/marc-doran-b5ab3b21b/'
            />
            <EmployeeID
              employeeID={styles.davispic}
              employee='Davis Zung'
              employeegit='https://github.com/daviszung'
              employeelinkedin='https://www.linkedin.com/in/davis-zung/'
            />
            <EmployeeID
              employeeID={styles.elliotpic}
              employee='Elliot Adinolfi'
              employeegit='https://github.com/ElliotAdinolfi'
              employeelinkedin='https://www.linkedin.com/in/elliot-adinolfi/'
            />
            <EmployeeID
              employeeID={styles.austinpic}
              employee='Austin Johnson'
              employeegit='https://github.com/LovesWorking'
              employeelinkedin='https://www.linkedin.com/in/lovesworking/'
            />
            <EmployeeID
              employeeID={styles.karlpic}
              employee='Karl Richards'
              employeegit='https://github.com/Acario175'
              employeelinkedin='https://www.linkedin.com/in/krichards175/'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
