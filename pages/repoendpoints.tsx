import Sidenav from "./components/Sidenav"
import styles from '../styles/Repoendpoints.module.scss';
import axios from "axios";
import { Octokit } from "octokit";
import { parseCookies } from '../lib/parseCookies';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const repoendpoints = ({ initialRememberValue }) => {
  // list of repos
  const [ repos, setRepos ] = useState(null);
  // toggle input menu - initially false so it wont show up
  // get input value
  const [ repoClicked, setRepoClicked ] = useState(null);
  const [ inputToggle, setInputToggle ] = useState(false);
  const [ inputValue, setInputValue ] = useState('');
  // close input menu
  const toggleInput = () => {
    inputToggle ? setInputToggle(false) : setInputToggle(true)
  }
  // change input value
  const inputChange = async (e) => {
    setInputValue(e.target.value)
  }
  // function for clicking a repo to link, should open up an input menu, then save to DB
  const selectRepo = (e) => {
    setRepoClicked(e.target.textContent);
    toggleInput();
  }
  // getting commit history for a specific repo
  const printInfo = async () => {
    // get user access token
    const result = await axios.post(`/api/finduser/user`, {
      username: initialRememberValue
    });
    // store the github access token in a variable
    const token = result.data.github.token;
    // octokit (just cuz github used examples with this and it seemed simpler)
    const octokit = new Octokit({ auth: `${token}`}); // give auth the token as a string
    // store repos result in variable
    const test = await octokit.request(`GET /user/repos`);
    // Loop through array of objects (result (test))
    const displayRepos = [];
    for (const key of test.data) {
        displayRepos.push(<li onClick={selectRepo} key={uuidv4()}>{key.name}</li>)
    }
    setRepos(displayRepos);
  }
  useEffect(() => {
    printInfo();
  }, [])

  return (
    <div className={styles.repoendpoints}>
      <Sidenav />
      <div className={inputToggle ? styles.inputMenu : styles.hideIt}>
          <div className={styles.inputContainer}>
            <h1 className={styles.command}>Enter an Endpoint for <span className={styles.repoClicked}>{repoClicked}</span></h1>
            <button className={styles.closeMenu} onClick={toggleInput}>X</button>
            <input type="text" value={inputValue} placeholder="Ex: https://Google.com" onChange={inputChange}/>
            <button className={styles.linkIt}>Link</button>
          </div>
      </div>
      <div className={styles.repoList}>
        <h1>Select A Repo to Link with an Endpoint</h1>
        <ul>
          {repos ? repos : 'Loading Repos...'}
        </ul>
      </div>
    </div>
  )
}

// cookies
repoendpoints.getInitialProps = async ({ req }) => {
  // Parseing cookie with our own function so we can read it
  const cookies = parseCookies(req);
  // Return our cookie and grab name from cookie
  return {
    initialRememberValue: cookies.userId,
  };
};

export default repoendpoints