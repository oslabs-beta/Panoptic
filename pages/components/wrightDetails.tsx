import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import style from '../../styles/Dashboard.module.scss'

const wrightDetails = (props: any) => {
  const tempArr = [];
  let metrics;
  // extract the most current date of the user's history
  if (props.user && props.selectedEndpoint !== 'Select An Endpoint') {
    const mainObj = props.user[props.selectedEndpoint];
    const dateArr = Object.keys(mainObj);
    const recentDate = dateArr[dateArr.length - 1];
    metrics = mainObj[recentDate].metrics
  }

  // Relevant Metrics Properties:
  // accessibilityMetrics
  // bestPracticesMetrics
  // performanceMetrics
  // seoMetrics

  if (metrics) {
    for (let i in metrics[props.selectedMetric]) {
      // if the score is 1, style it green
      // if the score is < 1, style it red
      let elementStyle;
      metrics[props.selectedMetric][i].score < 1 ? elementStyle = style.detailElementFlaw : elementStyle = style.detailElement;
      let myCard = (
        <AccordionItem className={elementStyle}>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                {metrics[props.selectedMetric][i].title}
              </Box>
            <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{metrics[props.selectedMetric][i].description}</AccordionPanel>
        </AccordionItem>
      )
      tempArr.push(myCard)
    }
  }
  
  return (
    <Accordion allowMultiple width='100%'>
      {tempArr}
    </Accordion>
  );
};

export default wrightDetails;
