import styles from '../../styles/Demo.module.scss';
import { Box, HStack, Button } from '@chakra-ui/react';
import LH_Gauge from './lhGauge';
import React, { FC } from 'react';

const controlPanelDemo: FC<any> = (props: any): JSX.Element => {
  const tempArr: JSX.Element[] = [];
  if (props.lhdata)
    for (const key in props.lhdata) {
      if (typeof props.lhdata[key] === 'number') {
        tempArr.push(
          <button
            id={`${key}Btn`}
            type='button'
            onClick={() => {
              props.setSelectedMetric(`${key}Metrics`);
            }}
          >
            <LH_Gauge
              className={styles.gauge}
              score={props.lhdata[key]}
              title={
                key !== 'seo' && key !== 'bestPractices'
                  ? key[0].toUpperCase() + key.substring(1) + ' Score:'
                  : key === 'seo'
                  ? 'SEO Score:'
                  : 'Best Practices Score:'
              }
            />
          </button>
        );
      }
    }
  return (
    <Box className={styles.mobileBoxHeight}>
      <div className={styles.innerGaugeContainer}>
        {tempArr}
      </div>
    </Box>
  );
};

export default controlPanelDemo;
