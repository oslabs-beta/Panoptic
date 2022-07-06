import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import style from '../../styles/Demo.module.scss';
import { FC } from 'react';

const wrightDetailsDemo: FC = (props: any) => {
  const tempArr: JSX.Element[] = [];
  let metrics;
  if (props.data) {
    metrics = props.data;
  }

  if (metrics) {
    for (let i in metrics[props.selectedMetric]) {
      const fullDescription = metrics[props.selectedMetric][i].description;
      const descritpionText = fullDescription.substring(
        0,
        fullDescription.indexOf('Learn more') - 1
      );
      const descriptionLink = fullDescription.substring(
        fullDescription.indexOf('https'),
        fullDescription.length - 2
      );

      let elementStyle;
      metrics[props.selectedMetric][i].score < 1
        ? (elementStyle = style.detailElementFlaw)
        : (elementStyle = style.detailElement);
      let myCard: JSX.Element = (
        <AccordionItem className={elementStyle}>
          <h2>
            <AccordionButton display={'flex'} justifyContent={'space-between'}>
              <Box
                display={'flex'}
                justifyContent='space-between'
                width={'97%'}
              >
                <div>{metrics[props.selectedMetric][i].title}</div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '17%',
                  }}
                >
                  <p>
                    {metrics[props.selectedMetric][i].displayValue !== 'numeric'
                      ? metrics[props.selectedMetric][i].displayValue
                      : ''}
                  </p>
                  <p>{`Score: ${Math.round(
                    metrics[props.selectedMetric][i].score * 100
                  )}`}</p>
                </div>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className={style.desContainer}>
            {descritpionText}
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
    <Accordion id='accordionDemo' allowMultiple width='100%'>
      {tempArr}
    </Accordion>
  );
};

export default wrightDetailsDemo;
