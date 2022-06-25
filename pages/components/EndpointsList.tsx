import { useState, useEffect } from 'react';
import style from '../../styles/Endpoints.module.scss';
import { parseCookies } from '../../lib/parseCookies';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const EndpointsList = (props: any) => {
  const [ endpoints, setEndpoints ] = useState([]);
  // filter user obj for only endpoints
  const filteredObj = () => {
    const test = Object.keys(props.endPts).map((key) => key);
    return test;
  }
  // click handler for selecting endpoint
  const endpointSelector = (e: any) => { 
    props.setSelected(e.target.textContent)
    props.func(props.endPts[e.target.textContent])
  }
  const endpointsArr = filteredObj();
  const arr = [];
  for (let i = 0; i < endpointsArr.length; i ++) {
    !arr.length ? arr.push(<li key={uuidv4()} className={style.li}><button onClick={endpointSelector}>{endpointsArr[i]}</button></li>) :
    arr.push(<li key={uuidv4()} className={style.li}><button onClick={endpointSelector}>{endpointsArr[i]}</button></li>)
  }
  return (
    <div className={style.EndpointsList}>
    <h1 className={style.endpointsTitle}>My Endpoints:</h1>
      <ul className={style.ul}>
        {arr}
      </ul>
    </div>
  )
}



export default EndpointsList