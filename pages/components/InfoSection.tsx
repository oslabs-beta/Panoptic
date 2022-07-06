import React from 'react';
import { Flex, Spacer, Text, Box, Heading } from '@chakra-ui/react';
import style from '../../styles/Home.module.scss'
// import { FaTools, FaHandshake, FaStar } from 'react-icons/fa';

const AboutUs = () => {
  //   const [isLargerThan48] = useMediaQuery('(min-width: 48em)');

  const array = [
    {
      title: 'Technical Website Audits ',
      info: 'Analyze historical records',
      info0: 'Audit multiple URLs or just one',
      info1: 'Record of all your audits',
      info2: 'Monitors ranking factors for your domain',
    },
    {
      title: 'Github',
      info: 'Login with Github to link your repositories and websites',
      info1: 'Keep track of audit metrics over a history of commits'
    },
    {
      title: 'Visual Reporting',
      info: 'View your report with gauges, charts, and interactive lists, making it easy to understand the wealth of information from your report',
    },
  ];

  return (
    <Flex
    justifyContent='center'
    >
      {array.map((arr) => (
        <>
          <Box
            height='300px'
            width='400px'
            bg='#b2caee'
            shadow='md'
            p='6'
            m='6'
            borderRadius='8px'
            textAlign='center'
            margin='0rem 5%'
            border='1px solid #C4DDFF'
            color='black'
            fontWeight='700'
            boxShadow='xl'
          >
            {/* <Icon as={arr.icon} boxSize={14} color='blue.600' mb='5' /> */}
            <Heading size='sm' fontSize='2rem' margin='0 0 2rem 0'>{arr.title}</Heading>
            <Text color='black' fontWeight='400' fontSize='1.35rem'>
              {arr.info}
              <br></br>
              {arr.info0}
              <br></br>
              {arr.info1}
              <br></br>
              {arr.info2}
              <br></br>
              {arr.info3}
              <br></br>
              {arr.info4}
            </Text>
          </Box>
        </>
      ))}
    </Flex>
  );
};

export default AboutUs;
