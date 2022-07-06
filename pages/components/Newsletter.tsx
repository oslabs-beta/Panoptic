import {useState} from 'react'
import styles from '../../styles/Newsletter.module.scss'
import axios from 'axios';

const Newsletter = () => {
  const [emailValue, setEmailValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const inputHandler = (e: any) => {
    setEmailValue(e.target.value)
  }
  // send to mailchimp
  const subscribeUser = async () => { 
    const url = '/api/newsletter/1'
    // checks if email
    if(!emailValue.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      return setError(true);
    }
    await axios.post(url, {
      EMAIL: emailValue
    });
    setEmailValue('');
    setSubmitted(true);
  }
  return (
    <div className={styles.Newsletter}>
      <h1 className={styles.title}>{submitted ? 'Preciate it, g.' : 'Sign Up For Our Newsletter!'}</h1>
      <p className={styles.subtext} style={{display: submitted ? 'none' : 'block'}} >Get the latest updates on Panoptic. Don't worry, we b spammin like a mf.</p>
      <div className={styles.inputContainer} style={{display: submitted ? 'none' : 'block'}}>
        <input type="text" placeholder="Enter Your Email" value={emailValue} onChange={inputHandler}/>
        <button onClick={subscribeUser} className={styles.submitBtn}>Submit</button>
      </div>
      <p className={styles.emailErr} style={{display: error ? 'block' : 'none' }}>NOOOO! BAD EMAIL!</p>
    </div>
  )
}

export default Newsletter