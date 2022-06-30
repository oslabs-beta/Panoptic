import { Octokit, App } from "octokit";
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const Repos = (props: any): JSX.Element => {
  // Repos State
  const [repos, setRepos] = useState([])
  // getting commit history for a specific repo
  const repoInfo = async () => {
    // // get user access token (getting mine (marc's))
    // const user = await axios.get(`/api/user/${props.user.}`);
    // store the github access token in a variable
    console.log(props.user)
    const token = await props.user.github.token;
    // octokit (just cuz github used examples with this and it seemed simpler)
    const octokit = new Octokit({ auth: `${token}`}); // give auth the token as a string
    // store commit history result in variable
    const repoList = await octokit.request('GET /user/repos');
    // see it here (in browser)
    await setRepos(repoList.data.map(el => el.name));
  }
  useEffect(() => {
    repoInfo();
  }, [])
  // populating repoArr as a list element
  const repoArr: any = [];
  repos.forEach(repoName => {
    repoArr.push(<li key={uuidv4()}>{repoName}</li>)
  })

  return (
    <div>
      <h1>My Repos</h1>
      <ul>
        {repoArr}
      </ul>
    </div>
  )
}


export default Repos