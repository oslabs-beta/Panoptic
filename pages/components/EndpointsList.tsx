import { useState } from 'react';
import style from '../../styles/Endpoints.module.scss';
import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Flex,
  Button,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Spacer,
  VStack,
  Text,
} from '@chakra-ui/react';
import {
  SmallAddIcon,
  SmallCloseIcon,
  EditIcon,
} from '@chakra-ui/icons';

const EndpointsList:FC = (props: any) => {

  const [endpoints, setEndpoints] = useState([]);

  // filter user obj for only endpoints
<<<<<<< HEAD
  const filteredObj = () => {
    const test:String[] = Object.keys(props.endPts).map((key) => key);
    console.log('in filtered obj func', test);
=======
  const filteredObj = ():string[] => {
    const test:string[] = Object.keys(props.endPts).map((key) => key);
>>>>>>> dbchanges
    return test;
  };

  // click handler for selecting endpoint
  const endpointSelector = (e: any):void => {
    props.setSelected(e.target.textContent);
    props.func(e, e.target.textContent);
  };
  const endpointsArr:String[] = filteredObj();
  const arr:JSX.Element[] = [];
  for (const key in props.reponames) {
<<<<<<< HEAD
    console.log('props.reponames', props.reponames);
    const tempArr = props.reponames[key].map((el:String) => (
=======
    const tempArr:JSX.Element[] = props.reponames[key].map((el:String) => (
>>>>>>> dbchanges
      <Button key='Button' onClick={endpointSelector}>{el}</Button>
    ));
    arr.push(
      <AccordionItem key={uuidv4()} className={style.li}>
        <AccordionButton>
          <Flex width='100%'>
            <Text fontSize='4xl' fontWeight='semibold'>
              {key}
            </Text>
            <Spacer />
            <VStack>
              <SmallAddIcon onClick={() => console.log('Add clicked')} />
              <Spacer />
              <EditIcon onClick={() => console.log('Add clicked')} />
              <Spacer />
              <SmallCloseIcon onClick={() => console.log('Del clicked')} />
            </VStack>
          </Flex>
        </AccordionButton>
        <AccordionPanel pb={4}>{tempArr}</AccordionPanel>
      </AccordionItem>
    );
  }
  return (
    <div className={style.EndpointsList}>
      <Accordion className={style.endpointContainer}>
        <h1 className={style.endpointsTitle}>My Repos:</h1>
        {arr}
      </Accordion>
    </div>
  );
};

export default EndpointsList;
