import styles from '../../styles/Dashboard.module.scss';
import { Box, HStack, Button } from '@chakra-ui/react';
import LH_Gauge from './lhGauge';
import React, { FC } from 'react';

const controlPanel: FC = (props: any): JSX.Element => {
  const tempArr: JSX.Element[] = [];
  if (props.lhdata)
    for (const key in props.lhdata) {
      if (typeof props.lhdata[key] == 'number') {
        // console.log('KEY', key);
        tempArr.push(
          <button
            key={`${key}Btn`}
            type='button'
            onClick={() => {
              props.setSelectedMetric(`${key}Metrics`);
            }}
          >
            <LH_Gauge
              key={`${key}Gauge`}
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
    <Box>
      <HStack spacing='0px' borderRadius='full' bg='#111c44' m={4} h={180}>
        {tempArr}
      </HStack>
    </Box>
  );
};

export default controlPanel;
