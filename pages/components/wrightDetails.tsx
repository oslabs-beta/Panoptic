import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

const wrightDetails = (props: any) => {
  const tempArr = [];
  let metrics;
  console.log(props.selectedEndpoint)
  // extract the most current date of the user's history
  if (props.user && props.selectedEndpoint !== 'Select An Endpoint') {
    const mainObj = props.user[props.selectedEndpoint];
    const dateArr = Object.keys(mainObj);
    const recentDate = dateArr[dateArr.length - 1];
    metrics = mainObj[recentDate].metrics
  }
  console.log(metrics)
  if (metrics) {
    for (let i in metrics.accessibilityMetrics) {

      // if the score is 1, style it green
      // if the score is < 1, style it red
      if (metrics.accessibilityMetrics[i].score === 1) {
        let myCard = (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  {metrics.accessibilityMetrics[i].title}
                </Box>
              <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{metrics.accessibilityMetrics[i].description}</AccordionPanel>
          </AccordionItem>
        )
        tempArr.push(myCard)
      }
      console.log(metrics.accessibilityMetrics[i])
    }
  }
  
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {tempArr}
    </Accordion>
  );
};

export default wrightDetails;
