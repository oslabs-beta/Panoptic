import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import style from '../../styles/Dashboard.module.scss';
import { FC } from 'react';

const wrightDetails = (props: any) => {
  // console.log(props);
  const tempArr: JSX.Element[] = [];
  let metrics;
  // extract the most current date of the user's history
  // console.log('PROPS USER AND SELECTEDEP', props.user, props.selectedEndpoint);
  if (props.user && props.selectedEndpoint !== 'Select An Endpoint') {
    // typing is a bit odd here, will come back to this
    const mainObj: any = props.user[props.selectedEndpoint]['desktop'];
    console.log(mainObj);
    const dateArr: string[] = Object.keys(mainObj);
    console.log(dateArr);
    const recentDate: string = dateArr[dateArr.length - 1];
    metrics = mainObj[recentDate].metrics;
  }

  if (metrics) {
    for (const i in metrics[props.selectedMetric]) {
      let elementStyle: string;
      metrics[props.selectedMetric][i].score < 1
        ? (elementStyle = style.detailElementFlaw)
        : (elementStyle = style.detailElement);
      let myCard: JSX.Element = (
        <AccordionItem key={i} className={elementStyle}>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                {metrics[props.selectedMetric][i].title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {metrics[props.selectedMetric][i].description}
          </AccordionPanel>
        </AccordionItem>
      );
      tempArr.push(myCard);
    }
  }

  return (
    <Accordion allowMultiple width='100%'>
      {tempArr}
    </Accordion>
  );
};

export default wrightDetails;
