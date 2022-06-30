import styles from '../../styles/Dashboard.module.scss';
import Link from 'next/link';
import { Box, HStack, Button } from '@chakra-ui/react';
import LH_Gauge from './lhGauge';

const controlPanel = (props: any): JSX.Element => {
  console.log({ props });
  const tempArr = [];

  if (props.lhdata)
    for (let key in props.lhdata) {
      if (typeof props.lhdata[key] == 'number') {
        tempArr.push(
          <LH_Gauge
            className={styles.gauge}
            score={props.lhdata[key]}
            title={`${key} Score:`}
          />
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
