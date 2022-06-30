import { useState, useEffect } from 'react';
import style from '../../styles/Endpoints.module.scss';
import { parseCookies } from '../../lib/parseCookies';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Flex,
  Button,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Spacer,
  HStack,
  VStack,
  Text,
} from '@chakra-ui/react';
import {
  SmallAddIcon,
  AddIcon,
  SmallCloseIcon,
  EditIcon,
} from '@chakra-ui/icons';

const EndpointsList = (props: any) => {
  // console.log({ props });
  const [endpoints, setEndpoints] = useState([]);
  // filter user obj for only endpoints
  const filteredObj = () => {
    const test = Object.keys(props.endPts).map((key) => key);
    return test;
  };

  // click handler for selecting endpoint
  const endpointSelector = (e: any) => {
    // console.log(e);
    props.setSelected(e.target.textContent);
    // props.setLoaded(true);
    // console.log(e.target.textContent);
    props.func(e, e.target.textContent);
  };
  const endpointsArr = filteredObj();
  const arr = [];
  // Obj = {'Other' : [] , 'MySite' : []}
  /* for (const key in Obj) {
      for(const ele of Obj[key]){
        do whateva ()
      }
      */
  // console.log(props.endPts);
  // console.log(props.reponames);
  // for (let i = 0; i < props.reponames.length; i++) {
  for (const key in props.reponames) {
    // console.log(props.reponames[i], props.endPts.reponame);
    // !arr.length?
    let tempArr = props.reponames[key].map((el) => (
      <Button onClick={endpointSelector}>{el}</Button>
    ));
    // console.log(tempArr);
    arr.push(
      <AccordionItem key={uuidv4()} className={style.li}>
        <AccordionButton>
          <Flex width='100%'>
            <Text fontSize='4xl' fontWeight='semibold'>
              {key}
            </Text>
            {/* <Button onClick={endpointSelector}>{key}</Button> */}
            <Spacer />
            {/* <Box bg='green.500'>{key}</Box> */}
            {/* <AccordionIcon /> */}
            <VStack>
              <SmallAddIcon onClick={() => console.log('Add clicked')} />
              <Spacer />
              <EditIcon onClick={() => console.log('Add clicked')} />
              <Spacer />
              <SmallCloseIcon onClick={() => console.log('Del clicked')} />
            </VStack>
          </Flex>
          {/* <Flex direction='row' height='100%' width='100%'>
            <Box p='4' bg='red.400'>
              Box 1
            </Box>
            <Spacer />
            <Box p='4' bg='green.400'>
              Box 2
            </Box>
          </Flex> */}
        </AccordionButton>
        <AccordionPanel pb={4}>{tempArr}</AccordionPanel>
      </AccordionItem>
    );
    //   : arr.push(
    //       <AccordionItem key={uuidv4()} className={style.li}>
    //         <AccordionButton>
    //           <Flex alignItems='center' minWidth='max-content'>
    //             <Button onClick={endpointSelector}>{endpointsArr[i]}</Button>
    //             <Spacer />
    //             {/* <AccordionIcon /> */}
    //             <VStack>
    //               <SmallAddIcon onClick={() => console.log('Add clicked')} />
    //               {/* <Spacer /> */}
    //               <EditIcon onClick={() => console.log('Add clicked')} />
    //               {/* <Spacer /> */}
    //               <SmallCloseIcon onClick={() => console.log('Del clicked')} />
    //             </VStack>
    //           </Flex>
    //         </AccordionButton>
    //         <AccordionPanel pb={4}>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    //           enim ad minim veniam, quis nostrud exercitation ullamco laboris
    //           nisi ut aliquip ex ea commodo consequat.
    //         </AccordionPanel>
    //       </AccordionItem>
    //     );
  }
  return (
    <div className={style.EndpointsList}>
      <Accordion className={style.endpointContainer}>
        <h1 className={style.endpointsTitle}>My Repos:</h1>
        {/* <ul className={style.ul}>{arr}</ul> */}
        {arr}
      </Accordion>
    </div>
  );
};

export default EndpointsList;
