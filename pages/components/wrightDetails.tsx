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
  const tempArr: JSX.Element[] = [];
  let metrics;
  // extract the most current date of the user's history
  if (props.user && props.selectedEndpoint !== 'Select An Endpoint') {
    // typing is a bit odd here, will come back to this
    const mainObj: any = props.user[props.selectedEndpoint]['desktop'];
    const dateArr: string[] = Object.keys(mainObj);
    const recentDate: string = dateArr[dateArr.length - 1];
    metrics = mainObj[recentDate].metrics;
  }

  if (metrics) {
    for (const i in metrics[props.selectedMetric]) {
      const fullDescription = metrics[props.selectedMetric][i].description;
      const descriptionText = fullDescription.substring(
        0,
        fullDescription.indexOf('Learn more') - 1
      );
      const descriptionLink = fullDescription.substring(
        fullDescription.indexOf('https'),
        fullDescription.length - 2
      );
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
                <p>{`Score: ${Math.round(
                    metrics[props.selectedMetric][i].score * 100
                  )}`}</p>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel textAlign='right' p={5} m={0} w={300} pb={0}>
            {descriptionText}
            <a href={descriptionLink} rel='noreferrer' target='_blank'>
              <div className={style.learnMoreBtn}>Learn More</div>
            </a>
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
