import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import style from '../../styles/Demo.module.scss'

const wrightDetailsDemo = (props: any) => {
  const tempArr:JSX.Element[] = [];
  let metrics;
  // extract the most current date of the user's history
  // if (props.user && props.selectedEndpoint !== 'Select An Endpoint') {
  //   const mainObj:String = props.user[props.selectedEndpoint];
  //   const dateArr:String[] = Object.keys(mainObj);
  //   const recentDate:String = dateArr[dateArr.length - 1];
  //   metrics = mainObj[recentDate].metrics
  // }
  if (props.data) {
    metrics = props.data;
  }

  if (metrics) {
    for (let i in metrics[props.selectedMetric]) {
      // if the score is 1, style it green
      // if the score is < 1, style it red
      let elementStyle;
      metrics[props.selectedMetric][i].score < 1 ? elementStyle = style.detailElementFlaw : elementStyle = style.detailElement;
      let myCard:JSX.Element = (
        <AccordionItem className={elementStyle}>
          <h2>
            <AccordionButton display={'flex'} justifyContent={'space-between'}>
              <Box display={'flex'} justifyContent='space-between' width={'97%'}>
                <div>
                {metrics[props.selectedMetric][i].title}
                </div>
                <div style={{display:'flex', justifyContent: 'space-between', width: '17%'}}>
                  <p>{metrics[props.selectedMetric][i].displayValue}</p>
                  <p>{`Score: ${(metrics[props.selectedMetric][i].score) * 100}`}</p>
                </div>
                
              </Box>
            <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {metrics[props.selectedMetric][i].description}
          </AccordionPanel>
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

export default wrightDetailsDemo;
