import Sidenav from './components/Sidenav';
import styles from '../styles/Repoendpoints.module.scss';
import axios from 'axios';
import { Octokit } from 'octokit';
import { parseCookies } from '../lib/parseCookies';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NextPage } from 'next';
// const User = require('../models/loginModel.ts');

const Repoendpoints: NextPage = ({
  initialRememberValue,
}: any): JSX.Element => {
  const [repos, setRepos] = useState([false]); // lists their repos
  const [repoClicked, setRepoClicked] = useState(null); // self explanatory...displays repo clicked
  const [inputToggle, setInputToggle] = useState(false); // will display if toggle true
  const [inputValue, setInputValue] = useState(''); // get input value onChange

  /********************** 
    function to toggle inputToggle state
  ************************/
  const toggleInput = () => {
    inputToggle ? setInputToggle(false) : setInputToggle(true);
  };

  /***************************
    function to get inputValue
    passed into input's onChange
    React way of doing a document.querySelector(input).value
   ***************************/
  const inputChange = async (e: any) => {
    setInputValue(e.target.value);
  };

  /***********************************************
    function for clicking a repo to link, 
    should open up an input menu, then save to DB
  ***********************************************/
  const selectRepo = (e: any) => {
    setRepoClicked(e.target.textContent);
    toggleInput();
  };

  /***********************************
   function for updating user repos
   - should happen on click of LINK button
   - send repoClicked and inputValue
  ***********************************/
  const updateUserRepos = async () => {
    // const urlname: string = inputValue;
    // console.log(urlname.value);
    const result = await axios.post('/api/updateuser/', {
      id: initialRememberValue,
      url: inputValue,
      reponame: repoClicked,
    });
    // console.log({ result });
    // const users = require('../models/loginModel.ts');
    // let currentUser = await users.findOne({ _id: initialRememberValue });
  };

  /*************************************************** 
    getting commit history for a specific repo using Octokit
    (Github recommended)
  ****************************************************/
  const printInfo = async () => {
    // get user access token
    const result = await axios.post(`/api/finduser/`, {
      username: initialRememberValue,
    });

    // store the github access token in a variable
    const token = result.data.github.token;
    // console.log(token);
    // octokit (just cuz github used examples with this and it seemed simpler)
    const octokit = new Octokit({ auth: `${token}` }); // give auth the token as a string
    // store repos result in variable
    // console.log(octokit);
    const test = await octokit.request(`GET /user/repos`);
    // Loop through array of objects (result (test))
    const displayRepos: any = [];
    for (const key of test.data) {
      displayRepos.push(
        <li onClick={selectRepo} key={uuidv4()}>
          {key.name}
        </li>
      );
    }
    // State will update and display list of repos
    setRepos(displayRepos);
  };

  // start getting repos when component renders
  useEffect(() => {
    printInfo();
  }, []);

  return (
    <div className={styles.repoendpoints}>
      {/* Sidenav should get passed the userData if you want the github info to display on it */}
      <Sidenav />

      {/* The Card that is initially hidden until you click on a repo */}
      <div className={inputToggle ? styles.inputMenu : styles.hideIt}>
        <div className={styles.inputContainer}>
          <h1 className={styles.command}>
            Enter an Endpoint for{' '}
            <span className={styles.repoClicked}>{repoClicked}</span>
          </h1>
          <button className={styles.closeMenu} onClick={toggleInput}>
            X
          </button>
          <input
            type='text'
            id='inputText'
            value={inputValue}
            placeholder='Ex: https://Google.com'
            onChange={inputChange}
          />
          {/* button to update user repo on click */}
          <button className={styles.linkIt} onClick={updateUserRepos}>
            Link
          </button>
        </div>
      </div>

      {/* Container For List Of Repos */}
      <div className={styles.repoList}>
        <h1>Select A Repo to Link with an Endpoint</h1>
        <ul>
          {/* logic to check if repos is false-y, 
          displays 'loading repos...' or something 
          (which could be empty if they have no repos, so...) */}
          {repos[0] ? repos : 'Loading Repos...'}
        </ul>
      </div>
    </div>
  );
};

// Was gonna use this just to put the github info on the sidenav...

// cookies
Repoendpoints.getInitialProps = async ({ req }: any) => {
  // Parseing cookie with our own function so we can read it
  const cookies = parseCookies(req);
  // Return our cookie and grab name from cookie
  return {
    initialRememberValue: cookies.userId,
  };
};

export default Repoendpoints;
